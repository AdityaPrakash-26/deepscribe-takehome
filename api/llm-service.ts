// Deployed to Cloudflare Workers
// Local dev: npx wrangler dev (runs on http://localhost:8787)
// wrangler deploy

import type { AnalysisResult, ApiResponse, TranscriptRequest } from "../types/api";

export interface Env {
  NVIDIA_API_KEY: string;
}

const NVIDIA_BASE = "https://integrate.api.nvidia.com/v1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const SYSTEM_PROMPT = `You are a clinical AI assistant. Analyze the provided doctor-patient transcript and return a JSON object with exactly these fields:
- "summary": a 2-3 sentence clinical summary of the visit
- "extractedConditions": array of strings — medical conditions or diagnoses mentioned
- "medications": array of strings — medications mentioned (including dosages if stated)

Respond ONLY with a valid JSON object. No markdown, no code fences, no explanation.

Example:
{
  "summary": "Patient presented with...",
  "extractedConditions": ["Type 2 diabetes", "Hypertension"],
  "medications": ["Metformin 1000mg BID", "Lisinopril 10mg"]
}`;

function extractJson(text: string): string {
  // Strip markdown code fences if the model wraps the output
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();
  return text.trim();
}

async function analyzeWithNvidia(transcript: string, apiKey: string): Promise<AnalysisResult> {
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
      temperature: 0.2,
      top_p: 0.95,
      max_tokens: 2048,
      stream: false,
      chat_template_kwargs: { thinking: true },
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
  const parsed = JSON.parse(extractJson(raw)) as Pick<
    AnalysisResult,
    "summary" | "extractedConditions" | "medications"
  >;

  return {
    summary: parsed.summary ?? "",
    extractedConditions: parsed.extractedConditions ?? [],
    medications: parsed.medications ?? [],
    recommendedTrials: [], // populated in a future phase
    analysisTimestamp: new Date().toISOString(),
  };
}

const handler = {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === "/analyze" && request.method === "POST") {
      const body = (await request.json()) as TranscriptRequest;

      if (!body.transcript?.trim()) {
        return Response.json(
          { success: false, error: "transcript is required" } satisfies ApiResponse<never>,
          { status: 400, headers: corsHeaders }
        );
      }

      try {
        const data = await analyzeWithNvidia(body.transcript, env.NVIDIA_API_KEY);
        return Response.json(
          { success: true, data } satisfies ApiResponse<AnalysisResult>,
          { headers: corsHeaders }
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "LLM analysis failed";
        return Response.json(
          { success: false, error: message } satisfies ApiResponse<never>,
          { status: 502, headers: corsHeaders }
        );
      }
    }

    return Response.json(
      { success: false, error: "Not found" } satisfies ApiResponse<never>,
      { status: 404, headers: corsHeaders }
    );
  },
};

export default handler;
