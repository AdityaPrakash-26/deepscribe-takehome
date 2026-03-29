import type { PatientProfile } from "../../types/api";
import { stripCodeFences } from "./utils";

const NVIDIA_BASE = "https://integrate.api.nvidia.com/v1";

const SYSTEM_PROMPT = `Extract a patient profile from a doctor-patient transcript for clinical trial matching. Only include what is explicitly stated and positively asserted about the patient. Do not infer or guess.

Important:
- Do not include negated, denied, ruled-out, hypothetical, or screening-check items.
- Do not include family history unless it is the patient's own diagnosis.
- Do not include medications the patient is NOT taking.
- Do not include diagnoses the clinician explicitly says the patient does NOT have.
- For medications, include only active current medications the patient is taking.
- For diagnoses, include only confirmed active diagnoses or clearly stated past medical history that the patient actually has.
- For symptoms, prefer short clinical terms or concise phrases instead of narrative descriptions.
- For biomarkers, include only disease-relevant labs, genetics, pathology, staging, or imaging markers.
- Do not include routine vital signs or body measurements such as blood pressure, height, weight, BMI, temperature, or oxygen saturation unless they are clearly central to the disease being matched.

Return ONLY a valid JSON object with these fields:

{
  "age": <integer or null>,
  "sex": "Male" | "Female" | "Other" | null,
  "diagnoses": ["confirmed diagnoses using clinical terms, e.g. 'Stage IIIA non-small cell lung cancer'"],
  "symptoms": ["patient-reported or clinician-observed symptoms"],
  "medications": ["current medications, include dosage if stated"],
  "biomarkers": ["lab values, genetic markers, staging, imaging findings with numbers, e.g. 'PDL-1 60%', 'A1C 7.8%'"],
  "location": { "city": <string or null>, "state": <string or null>, "country": <string or null> }
}

Return ONLY valid JSON. No markdown, no commentary.`;

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

  const raw = data.choices[0]?.message?.content ?? "";
  const parsed = JSON.parse(stripCodeFences(raw)) as Partial<PatientProfile>;

  return {
    age: typeof parsed.age === "number" ? parsed.age : null,
    sex: parsed.sex ?? null,
    diagnoses: Array.isArray(parsed.diagnoses) ? parsed.diagnoses : [],
    symptoms: Array.isArray(parsed.symptoms) ? parsed.symptoms : [],
    medications: Array.isArray(parsed.medications) ? parsed.medications : [],
    biomarkers: Array.isArray(parsed.biomarkers) ? parsed.biomarkers : [],
    location: parsed.location ?? null,
  };
}
