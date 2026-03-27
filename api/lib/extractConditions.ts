import type { PatientProfile } from "../../types/api";

const NVIDIA_BASE = "https://integrate.api.nvidia.com/v1";

const SYSTEM_PROMPT = `You are a clinical data extraction AI. Given a doctor-patient transcript, extract the following and return ONLY a valid JSON object:

{
  "age": <integer or null>,
  "sex": "Male" | "Female" | "Other" | null,
  "location": { "city": <string or null>, "state": <string or null>, "country": <string or null> },
  "conditions": ["diagnosed medical conditions, as specific as possible"],
  "keywords": ["medications, biomarkers, lab values, procedures, symptoms — short clinical terms only"]
}

Rules:
- conditions: use specific clinical terms (e.g. "Stage IIIA non-small cell lung cancer" not just "lung cancer")
- keywords: short terms like "metformin", "PDL-1 60%", "chemotherapy", "fatigue" — used to search clinical trial databases
- Return ONLY valid JSON. No markdown, no commentary.`;

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
      model: "deepseek-ai/deepseek-v3.2",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: transcript },
      ],
      temperature: 0.1,
      top_p: 0.95,
      stream: false,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`NVIDIA API error ${response.status}: ${err}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };

  const raw = data.choices[0].message.content;
  const parsed = JSON.parse(stripCodeFences(raw)) as Partial<PatientProfile>;

  return {
    age: typeof parsed.age === "number" ? parsed.age : null,
    sex: parsed.sex ?? null,
    location: parsed.location ?? null,
    conditions: Array.isArray(parsed.conditions) ? parsed.conditions : [],
    keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
  };
}
