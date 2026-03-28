"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import type { AnalysisResult } from "@/types/api";
import TranscriptInput from "./TranscriptInput";
import SampleDrawer from "./SampleDrawer";
import ResultsDisplay from "./results/ResultsDisplay";

export default function HomeContent() {
  const [transcript, setTranscript] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-30 border-b border-zinc-100 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            DeepScribe Takehome
          </span>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-600"
          >
            <FileText className="h-4 w-4 text-zinc-400" />
            Open Sample Transcripts
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Paste a Transcript
        </h1>

        <TranscriptInput
          value={transcript}
          onChange={setTranscript}
          onResult={(r) => { setResult(r); setError(null); }}
          onError={(e) => { setError(e); setResult(null); }}
          onLoadingChange={setIsLoading}
        />

        <ResultsDisplay result={result} error={error} isLoading={isLoading} />
      </main>

      <SampleDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSelectTranscript={setTranscript}
      />
    </div>
  );
}
