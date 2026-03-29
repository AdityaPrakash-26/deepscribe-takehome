import type { FetchedTrial, ScreenedTrial } from "../../types/api";
import type { LlmScreeningResult, ParsedTrialCriteria } from "./types";
import {
  buildPrompt,
  normalizeCriterionResults,
  parseEligibilityCriteria,
  sortTrials,
  stripCodeFences,
} from "./utils";

const NVIDIA_BASE = "https://integrate.api.nvidia.com/v1";

const SCREENING_PROMPT = `You evaluate clinical trial eligibility criteria against a clinical transcript. Return ONLY a valid JSON array.

Each array element must be:
{
  "trial_id": "<string>",
  "inclusion_results": [true | false, ...],
  "exclusion_results": [true | false, ...]
}

Rules:
- Use only evidence grounded in the transcript.
- Evaluate each criterion independently.
- inclusion_results and exclusion_results are boolean arrays, one value per criterion, in the same order as listed.
- If a trial has no inclusion or no exclusion criteria listed, return an empty array for that section.
- Do not omit any criteria — the array length must match the number of criteria provided.
- If an inclusion criterion cannot be confidently confirmed from the transcript, return false.
- If an exclusion criterion cannot be confidently ruled out from the transcript, return true.
- Return JSON only. No explanations, no markdown, no extra text.`;

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
    const raw = data.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(stripCodeFences(raw));
    if (!Array.isArray(parsed)) {
      return { ok: false, error: "AI returned an unexpected response format during screening." };
    }

    return { ok: true, data: parsed };
  } catch {
    return { ok: false, error: "Failed to parse AI screening response." };
  }
}

export async function screenEligibility(
  transcript: string,
  trials: FetchedTrial[],
  apiKey: string
): Promise<{ trials: ScreenedTrial[]; completed: boolean; screeningError: string | null }> {
  if (trials.length === 0) {
    return { trials: [], completed: true, screeningError: null };
  }

  // --- Parse eligibility criteria for each trial ---
  const parseableCriteria: ParsedTrialCriteria[] = [];
  const unparseableTrials: ScreenedTrial[] = [];

  for (const trial of trials) {
    const parsed = parseEligibilityCriteria(trial.eligibilityCriteria);

    if (!parsed.criteriaParsedSuccessfully) {
      unparseableTrials.push({
        ...trial,
        eligibility: {
          trial_id: trial.nctId,
          inclusion_results: [],
          exclusion_results: [],
          final_eligibility: false,
          criteria_parsed: false,
        },
      });
      continue;
    }

    parseableCriteria.push({
      trial,
      inclusionCriteria: parsed.inclusionCriteria,
      exclusionCriteria: parsed.exclusionCriteria,
    });
  }

  if (parseableCriteria.length === 0) {
    return {
      trials: sortTrials(unparseableTrials),
      completed: true,
      screeningError: null,
    };
  }
  const prompt = buildPrompt(transcript, parseableCriteria);
  const result = await callLlm(prompt, apiKey);

  if (!result.ok) {
    const unscreenedTrials: ScreenedTrial[] = trials.map((trial) => {
      const unparseable = unparseableTrials.find((candidate) => candidate.nctId === trial.nctId);
      return unparseable ?? { ...trial, eligibility: null };
    });

    return {
      trials: sortTrials(unscreenedTrials),
      completed: false,
      screeningError: result.error,
    };
  }

  // Map LLM results back onto trials 
  // Index the nodel's boolean results by trial ID for O(1) lookup
  const llmResultsByTrialId = new Map<string, LlmScreeningResult>();
  for (const entry of result.data) {
    if (entry.trial_id) {
      llmResultsByTrialId.set(entry.trial_id, entry);
    }
  }

  // Pair each trial's parsed criteria with the LLM's boolean verdicts
  // and compute final eligibility (all inclusion met, no exclusion triggered).
  const screenedTrials: ScreenedTrial[] = parseableCriteria.map(({ trial, inclusionCriteria, exclusionCriteria }) => {
    const llmResult = llmResultsByTrialId.get(trial.nctId);

    const inclusion_results = normalizeCriterionResults(llmResult?.inclusion_results, inclusionCriteria, false);
    const exclusion_results = normalizeCriterionResults(llmResult?.exclusion_results, exclusionCriteria, true);
    const final_eligibility =
      inclusion_results.every((c) => c.result) && exclusion_results.every((c) => !c.result);

    return {
      ...trial,
      eligibility: { trial_id: trial.nctId, inclusion_results, exclusion_results, final_eligibility, criteria_parsed: true },
    };
  });

  return {
    trials: sortTrials([...screenedTrials, ...unparseableTrials]),
    completed: true,
    screeningError: null,
  };
}
