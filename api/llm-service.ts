// Deployed to Cloudflare Workers
// Local dev: npx wrangler dev (runs on http://localhost:8787)
// npx wrangler deploy

import type { AnalysisResult, ApiResponse, TranscriptRequest } from "../types/api";
import { extractPatientProfile } from "./lib/extractPatientProfile";
import { fetchAndFilterTrials } from "./lib/extractTrials";
import { screenEligibility } from "./lib/screenEligibility";

export interface Env {
    NVIDIA_API_KEY: string;
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
};

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
                // Stage 1: LLM extracts structured patient profile
                const patientProfile = await extractPatientProfile(body.transcript, env.NVIDIA_API_KEY);

                // Stage 2: fetch and filter trials from ClinicalTrials.gov
                const rawTrials = await fetchAndFilterTrials(patientProfile);

                // Stage 3: deterministic pre-filter + LLM eligibility screening
                const { trials: recommendedTrials, completed, screeningError } = await screenEligibility(
                    patientProfile, rawTrials, env.NVIDIA_API_KEY
                );

                const data: AnalysisResult = {
                    patientProfile,
                    recommendedTrials,
                    analysisTimestamp: new Date().toISOString(),
                    screeningCompleted: completed,
                    screeningError,
                };

                return Response.json(
                    { success: true, data } satisfies ApiResponse<AnalysisResult>,
                    { headers: corsHeaders }
                );
            } catch (err) {
                const message = err instanceof Error ? err.message : "Analysis failed";
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
