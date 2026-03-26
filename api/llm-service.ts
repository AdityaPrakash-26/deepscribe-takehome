// Deployed to Cloudflare Workers
// Local dev: npx wrangler dev (runs on http://localhost:8787)

import type { AnalysisResult, ApiResponse, TranscriptRequest } from "../types/api";

export interface Env {
  NVIDIA_API_KEY: string; // used in Phase 2
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const handler = {
  async fetch(request: Request): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (url.pathname === "/analyze" && request.method === "POST") {
      const body = (await request.json()) as TranscriptRequest;

      if (!body.transcript || body.transcript.trim().length === 0) {
        return Response.json(
          { success: false, error: "transcript is required" } satisfies ApiResponse<never>,
          { status: 400, headers: corsHeaders }
        );
      }

      // Stub response — Phase 2 will call NVIDIA LLM + ClinicalTrials.gov
      const data: AnalysisResult = {
        summary:
          "Analysis pending — LLM integration coming soon. Transcript received successfully.",
        extractedConditions: [],
        medications: [],
        recommendedTrials: [],
        analysisTimestamp: new Date().toISOString(),
      };

      return Response.json(
        { success: true, data } satisfies ApiResponse<AnalysisResult>,
        { headers: corsHeaders }
      );
    }

    return Response.json(
      { success: false, error: "Not found" } satisfies ApiResponse<never>,
      { status: 404, headers: corsHeaders }
    );
  },
};

export default handler;
