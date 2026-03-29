"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { analyzeTranscript } from "@/lib/api-client";
import type { AnalysisResult } from "@/types/api";

const STAGES = [
  { after: 0,     label: "Extracting patient profile…" },
  { after: 22000, label: "Fetching matching trials…" },
  { after: 27000, label: "Screening eligibility against criteria…" },
];

const FACTS = [
  "Only ~10% of drugs that enter clinical trials ultimately receive FDA approval.",
  "The first randomized controlled trial was conducted in 1948 to test streptomycin against tuberculosis.",
  "There are currently over 400,000 clinical trials registered worldwide on ClinicalTrials.gov.",
  "Clinical trials have 4 phases — Phase I tests safety, Phase II dosing, Phase III effectiveness, Phase IV long-term monitoring.",
  "The average drug takes 10–15 years and over $1 billion to go from discovery to market.",
  "About 70–85% of clinical trial participants report being glad they participated.",
  "The Declaration of Helsinki (1964) established the ethical principles guiding modern clinical research.",
  "Informed consent is a cornerstone of clinical research — participants must fully understand risks before enrolling.",
  "Phase III trials typically enroll hundreds to thousands of patients across multiple sites globally.",
  "Observational studies like registries help researchers understand how treatments work in real-world patients.",
];

interface TranscriptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmitStart?: () => void;
  onResult: (result: AnalysisResult) => void;
  onError: (error: string) => void;
  onLoadingChange?: (loading: boolean) => void;
}

export default function TranscriptInput({
  value,
  onChange,
  onSubmitStart,
  onResult,
  onError,
  onLoadingChange,
}: TranscriptInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [factIndex, setFactIndex] = useState(0);
  const [factOpacity, setFactOpacity] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const factIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Progress bar and stage label
  useEffect(() => {
    if (!isLoading) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      // Fast initial fill that slows dramatically near 99%
      // Uses a shorter time constant so first ~30% fills quickly
      const pct = Math.min(99, 99 * (1 - Math.exp(-elapsed / 20000)));
      setProgress(pct);
      if (pct < 98) {
        const current = [...STAGES].reverse().find((s) => elapsed >= s.after);
        if (current) setStage(current.label);
      } else {
        setStage("Almost there…");
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 300);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isLoading]);

  // Rotating fun facts with fade
  useEffect(() => {
    if (!isLoading) {
      if (factIntervalRef.current) clearInterval(factIntervalRef.current);
      return;
    }

    factIntervalRef.current = setInterval(() => {
      setFactOpacity(0);
      setTimeout(() => {
        setFactIndex((i) => (i + 1) % FACTS.length);
        setFactOpacity(1);
      }, 350);
    }, 6000);

    return () => { if (factIntervalRef.current) clearInterval(factIntervalRef.current); };
  }, [isLoading]);

  function setLoadingState(loading: boolean) {
    setIsLoading(loading);
    onLoadingChange?.(loading);
  }

  async function handleSubmit() {
    setProgress(0);
    setStage(STAGES[0].label);
    setFactIndex(0);
    setFactOpacity(1);
    onSubmitStart?.();
    setLoadingState(true);

    let response;
    try {
      response = await analyzeTranscript(value);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to reach the API.");
      setLoadingState(false);
      return;
    }

    // Response received — stop the ticker, snap to 99%, hold for 1 s
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(99);
    setStage("Almost there…");
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    setLoadingState(false);

    if (response.success && response.data) {
      onResult(response.data);
    } else {
      onError(response.error ?? "An unknown error occurred.");
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
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !isLoading && value.trim()) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      {isLoading && (
        <div className="flex flex-col gap-2">
          {/* Progress bar */}
          <div className="flex flex-col gap-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-400">{stage}</p>
              <p className="text-xs tabular-nums text-zinc-300 dark:text-zinc-600">
                {Math.round(progress)}%
              </p>
            </div>
          </div>

          {/* Fun fact */}
          <div className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5 dark:border-blue-900/30 dark:bg-blue-950/20">
            <p className="mb-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              Did you know?
            </p>
            <p
              className="text-xs leading-relaxed text-blue-700 dark:text-blue-300"
              style={{ opacity: factOpacity, transition: "opacity 0.35s ease" }}
            >
              {FACTS[factIndex]}
            </p>
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-400">
        Note: uses a free AI endpoint (2 req/min). One analysis uses both requests, so please allow at least a minute between submissions.
      </p>
      <button
        onClick={handleSubmit}
        disabled={isLoading || value.trim().length === 0}
        className="self-end flex items-center gap-2 rounded-full bg-blue-600 px-7 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-zinc-900"
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {isLoading ? "Analyzing…" : "Analyze Transcript"}
        {!isLoading && (
          <kbd className="ml-1 hidden rounded border border-white/20 px-1 py-0.5 text-[10px] font-normal opacity-60 sm:inline">
            {typeof navigator !== "undefined" && /Mac/.test(navigator.userAgent) ? "⌘" : "Ctrl"}+↵
          </kbd>
        )}
      </button>
    </div>
  );
}
