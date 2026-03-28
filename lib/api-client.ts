import type { AnalysisResult, ApiResponse, TranscriptRequest } from "@/types/api";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787";

export async function analyzeTranscript(
  transcript: string
): Promise<ApiResponse<AnalysisResult>> {
  const body: TranscriptRequest = { transcript };

  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      (json as { error?: string } | null)?.error ??
      `Server error: ${res.status} ${res.statusText}`;
    return { success: false, error: message };
  }

  return json as ApiResponse<AnalysisResult>;
}
