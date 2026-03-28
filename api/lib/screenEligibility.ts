import type { ClinicalTrial, EligibilityAssessment, EligibilityStatus, PatientProfile } from "../../types/api";

interface LlmScreeningResult extends EligibilityAssessment {
  nctId: string;
}

const NVIDIA_BASE = "https://integrate.api.nvidia.com/v1";

const SCREENING_PROMPT = `You screen patients against clinical trial eligibility criteria. Return ONLY a JSON array.

Each element: {"nctId":"...","status":"eligible"|"potentially_eligible"|"likely_ineligible","reason":"one sentence","matchedCriteria":["short phrase"],"concerns":["short phrase"]}

Status rules:
- eligible: meets all inclusion, no exclusion violations
- potentially_eligible: partially meets criteria or info is missing — default when uncertain
- likely_ineligible: clearly fails inclusion or hits exclusion
Return ONLY valid JSON. Be concise.`;

function parseAgeToYears(ageStr: string): number | null {
  const match = ageStr.match(/^(\d+)\s*(years?|months?|days?|weeks?)?$/i);
  if (!match) return null;
  const value = parseInt(match[1], 10);
  const unit = (match[2] ?? "years").toLowerCase();
  if (unit.startsWith("year")) return value;
  if (unit.startsWith("month")) return value / 12;
  if (unit.startsWith("week")) return value / 52;
  if (unit.startsWith("day")) return value / 365;
  return value;
}

function deterministicPreFilter(
  profile: PatientProfile,
  trials: ClinicalTrial[]
): { toScreen: ClinicalTrial[]; preFiltered: ClinicalTrial[] } {
  const toScreen: ClinicalTrial[] = [];
  const preFiltered: ClinicalTrial[] = [];

  for (const trial of trials) {
    let disqualified = false;
    let reason = "";
    const concerns: string[] = [];

    // Age check
    if (profile.age !== null) {
      if (trial.minimumAge) {
        const minAge = parseAgeToYears(trial.minimumAge);
        if (minAge !== null && profile.age < minAge) {
          disqualified = true;
          reason = `Patient age (${profile.age}) is below the minimum age requirement (${trial.minimumAge}).`;
          concerns.push(`Below minimum age: ${trial.minimumAge}`);
        }
      }
      if (!disqualified && trial.maximumAge) {
        const maxAge = parseAgeToYears(trial.maximumAge);
        if (maxAge !== null && profile.age > maxAge) {
          disqualified = true;
          reason = `Patient age (${profile.age}) exceeds the maximum age requirement (${trial.maximumAge}).`;
          concerns.push(`Exceeds maximum age: ${trial.maximumAge}`);
        }
      }
    }

    // Sex check
    if (
      !disqualified &&
      profile.sex &&
      trial.acceptedSex &&
      trial.acceptedSex !== "ALL"
    ) {
      if (trial.acceptedSex.toUpperCase() !== profile.sex.toUpperCase()) {
        disqualified = true;
        reason = `Trial only accepts ${trial.acceptedSex} participants; patient is ${profile.sex}.`;
        concerns.push(`Sex mismatch: trial requires ${trial.acceptedSex}`);
      }
    }

    if (disqualified) {
      preFiltered.push({
        ...trial,
        eligibility: {
          status: "likely_ineligible",
          reason,
          matchedCriteria: [],
          concerns,
        },
      });
    } else {
      toScreen.push(trial);
    }
  }

  return { toScreen, preFiltered };
}

function buildScreeningUserPrompt(profile: PatientProfile, trials: ClinicalTrial[]): string {
  const patientJson = JSON.stringify({
    age: profile.age,
    sex: profile.sex,
    pregnancyStatus: profile.pregnancyStatus,
    diagnoses: profile.diagnoses,
    symptoms: profile.symptoms,
    medications: profile.medications,
    biomarkers: profile.biomarkers,
    priorTherapies: profile.priorTherapies,
    comorbidities: profile.comorbidities,
  }, null, 2);

  const trialBlocks = trials.map((t, i) => {
    return `--- Trial ${i + 1} ---
nctId: ${t.nctId}
title: ${t.title}
conditions: ${t.conditions.join(", ")}
minimumAge: ${t.minimumAge ?? "not specified"}
maximumAge: ${t.maximumAge ?? "not specified"}
sex: ${t.acceptedSex ?? "ALL"}
healthyVolunteers: ${t.healthyVolunteers}

Eligibility Criteria:
${t.eligibilityCriteria}`;
  }).join("\n\n");

  return `PATIENT PROFILE:
${patientJson}

CLINICAL TRIALS TO SCREEN:
${trialBlocks}`;
}

function stripCodeFences(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return (match ? match[1] : text).trim();
}

type LlmCallResult =
  | { ok: true; data: LlmScreeningResult[] }
  | { ok: false; error: string };

async function callLlm(prompt: string, apiKey: string): Promise<LlmCallResult> {
  const response = await fetch(`${NVIDIA_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "meta/llama-3.3-70b-instruct",
      messages: [
        { role: "system", content: SCREENING_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
      top_p: 0.95,
      stream: false,
    }),
  });

  if (response.status === 429) {
    return { ok: false, error: "AI rate limit reached (2 req/min). Wait a moment and try again." };
  }
  if (response.status === 524) {
    return { ok: false, error: "AI service timed out during eligibility screening. Try again or use a shorter transcript." };
  }
  if (!response.ok) {
    return { ok: false, error: `AI screening call failed (HTTP ${response.status}).` };
  }

  try {
    const data = (await response.json()) as {
      choices: { message: { content: string } }[];
    };
    const raw = data.choices[0].message.content;
    const parsed = JSON.parse(stripCodeFences(raw));
    if (!Array.isArray(parsed)) {
      return { ok: false, error: "AI returned an unexpected response format during screening." };
    }
    return { ok: true, data: parsed };
  } catch {
    return { ok: false, error: "Failed to parse AI screening response." };
  }
}

const STATUS_ORDER: Record<EligibilityStatus, number> = {
  eligible: 0,
  potentially_eligible: 1,
  likely_ineligible: 2,
};

export async function screenEligibility(
  profile: PatientProfile,
  trials: ClinicalTrial[],
  apiKey: string
): Promise<{ trials: ClinicalTrial[]; completed: boolean; screeningError: string | null }> {
  if (trials.length === 0) return { trials: [], completed: true, screeningError: null };

  const { toScreen, preFiltered } = deterministicPreFilter(profile, trials);

  // Nothing left to screen with LLM
  if (toScreen.length === 0) {
    return { trials: preFiltered, completed: true, screeningError: null };
  }

  const prompt = buildScreeningUserPrompt(profile, toScreen);

  // Single attempt only — no retry. A 30s wait would push total wall-clock time
  // past Cloudflare's response timeout, causing a 524 for the user.
  const result = await callLlm(prompt, apiKey);

  // Graceful degradation: return trials without screening
  if (!result.ok) {
    console.warn("Screening failed:", result.error);
    return { trials, completed: false, screeningError: result.error };
  }

  const assessments = result.data;

  // Build lookup from LLM results
  const assessmentMap = new Map<string, EligibilityAssessment>();
  for (const a of assessments) {
    if (a.nctId && a.status) {
      assessmentMap.set(a.nctId, {
        status: a.status,
        reason: a.reason ?? "",
        matchedCriteria: Array.isArray(a.matchedCriteria) ? a.matchedCriteria : [],
        concerns: Array.isArray(a.concerns) ? a.concerns : [],
      });
    }
  }

  // Merge assessments into trials
  const screened = toScreen.map((trial: ClinicalTrial) => ({
    ...trial,
    eligibility: assessmentMap.get(trial.nctId) ?? null,
  }));

  // Combine: screened + deterministically pre-filtered
  const all = [...screened, ...preFiltered];

  // Sort: eligible first, then potentially_eligible, then likely_ineligible, then unscreened
  all.sort((a, b) => {
    const sa = a.eligibility ? STATUS_ORDER[a.eligibility.status as EligibilityStatus] : 3;
    const sb = b.eligibility ? STATUS_ORDER[b.eligibility.status as EligibilityStatus] : 3;
    return sa - sb;
  });

  return { trials: all, completed: true, screeningError: null };
}
