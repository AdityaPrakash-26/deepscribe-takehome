"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { analyzeTranscript } from "@/lib/api-client";
import type { AnalysisResult } from "@/types/api";

interface TranscriptInputProps {
  value: string;
  onChange: (value: string) => void;
  onResult: (result: AnalysisResult) => void;
  onError: (error: string) => void;
}

export default function TranscriptInput({
  value,
  onChange,
  onResult,
  onError,
}: TranscriptInputProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const response = await analyzeTranscript(value);
      if (response.success && response.data) {
        onResult(response.data);
      } else {
        onError(response.error ?? "An unknown error occurred.");
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to reach the API.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full min-h-105 rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm leading-relaxed text-zinc-800 placeholder:text-zinc-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-y shadow-sm transition dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-blue-500 dark:focus:ring-blue-900/40"
        placeholder="Paste a doctor-patient transcript here or choose one from the sample present in the navbar"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
      />
      <p>
        Note: I am using a free AI endpoint which only allows 2 requests/minute, so please
        allow some time between submissions. Responses may be slow and may take upto 2 mins for
        long transcripts (~1000 words)
      </p>
      <button
        onClick={handleSubmit}
        disabled={isLoading || value.trim().length === 0}
        className="self-end flex items-center gap-2 rounded-full bg-blue-600 px-7 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-zinc-900"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLoading ? "Analyzing…" : "Analyze Transcript"}
      </button>
    </div>
  );
}
