import type { PatientProfile } from "../../types/api";

const NVIDIA_BASE = "https://integrate.api.nvidia.com/v1";

const SYSTEM_PROMPT = `Extract a patient profile from a doctor-patient transcript for clinical trial matching. Only include what is explicitly stated. Do not infer or guess.

Return ONLY a valid JSON object with these fields:

{
  "age": <integer or null>,
  "sex": "Male" | "Female" | "Other" | null,
  "pregnancyStatus": "pregnant" | "not pregnant" | null,
  "diagnoses": ["confirmed diagnoses using clinical terms, e.g. 'Stage IIIA non-small cell lung cancer'"],
  "symptoms": ["patient-reported or clinician-observed symptoms"],
  "medications": ["current medications, include dosage if stated"],
  "biomarkers": ["lab values, genetic markers, staging, imaging findings with numbers, e.g. 'PDL-1 60%', 'A1C 7.8%'"],
  "priorTherapies": ["prior treatments, surgeries, radiation, procedures"],
  "comorbidities": ["other medical conditions besides the primary diagnosis"],
  "location": { "city": <string or null>, "state": <string or null>, "country": <string or null> }
}

Return ONLY valid JSON. No markdown, no commentary.`;

function stripCodeFences(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return (match ? match[1] : text).trim();
}

export async function extractPatientProfile(
  transcript: string,
  apiKey: string
): Promise<PatientProfile> {
  const response = await fetch(`${NVIDIA_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "meta/llama-3.3-70b-instruct",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: transcript },
      ],
      temperature: 0.1,
      top_p: 0.95,
      stream: false,
    }),
  });

  if (response.status === 524) {
    throw new Error("AI service timed out. Try again — this can happen with long transcripts or during high load.");
  }
  if (response.status === 429) {
    throw new Error("AI rate limit reached (2 req/min). Wait a moment and try again.");
  }
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`NVIDIA API error ${response.status}: ${err}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };

  const raw = data.choices[0].message.content;
  const parsed = JSON.parse(stripCodeFences(raw)) as Partial<PatientProfile>;

  // Normalize — ensure all array/nullable fields have correct types
  return {
    age: typeof parsed.age === "number" ? parsed.age : null,
    sex: parsed.sex ?? null,
    pregnancyStatus: parsed.pregnancyStatus ?? null,
    diagnoses: Array.isArray(parsed.diagnoses) ? parsed.diagnoses : [],
    symptoms: Array.isArray(parsed.symptoms) ? parsed.symptoms : [],
    medications: Array.isArray(parsed.medications) ? parsed.medications : [],
    biomarkers: Array.isArray(parsed.biomarkers) ? parsed.biomarkers : [],
    priorTherapies: Array.isArray(parsed.priorTherapies) ? parsed.priorTherapies : [],
    comorbidities: Array.isArray(parsed.comorbidities) ? parsed.comorbidities : [],
    location: parsed.location ?? null,
  };
}
