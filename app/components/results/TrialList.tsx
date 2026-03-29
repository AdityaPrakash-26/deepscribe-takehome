"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import type { AnalysisResult, ScreenedTrial } from "@/types/api";
import TrialCard, { ELIGIBILITY_CONFIG } from "./TrialCard";

type FilterMode = "all" | "eligible" | "ineligible";

const FILTER_OPTIONS: { value: FilterMode; label: string }[] = [
  { value: "all", label: "All" },
  { value: "eligible", label: "Eligible" },
  { value: "ineligible", label: "Ineligible" },
];

function filterTrials(trials: ScreenedTrial[], mode: FilterMode): ScreenedTrial[] {
  if (mode === "eligible") return trials.filter((trial) => trial.eligibility?.final_eligibility);
  if (mode === "ineligible") return trials.filter((trial) => trial.eligibility && !trial.eligibility.final_eligibility);
  return trials;
}

export default function TrialList({ result }: { result: AnalysisResult }) {
  const [filter, setFilter] = useState<FilterMode>("all");
  const visibleTrials = filterTrials(result.recommendedTrials, filter);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          Clinical Trial Matches
        </h4>
        <span className="text-xs text-zinc-400">
          {result.recommendedTrials.length} results | analyzed{" "}
          {new Date(result.analysisTimestamp).toLocaleTimeString()}
        </span>
      </div>

      {!result.screeningCompleted && (
        <div className="mb-3 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800/40 dark:bg-amber-900/20">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-xs text-amber-700 dark:text-amber-400">
            {result.screeningError ??
              "Eligibility screening was unavailable. Trials are shown without assessment."}
          </p>
        </div>
      )}

      {result.screeningCompleted && result.recommendedTrials.length > 0 && (
        <div className="mb-3">
          <div className="mb-2 flex gap-1.5">
            {FILTER_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filter === value
                    ? "bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {Object.values(ELIGIBILITY_CONFIG).map((config) => (
              <span key={config.label} className="flex items-center gap-1.5 text-xs text-zinc-400">
                <span
                  className={`inline-block rounded-full px-1.5 py-0.5 text-xs font-medium ${config.badge}`}
                >
                  {config.label}
                </span>
                <span>{config.description}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {visibleTrials.length === 0 ? (
        <p className="text-sm text-zinc-400">
          {result.recommendedTrials.length === 0
            ? "No matching trials found."
            : "No trials match the current filter."}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {visibleTrials.map((trial) => (
            <TrialCard key={trial.nctId} trial={trial} />
          ))}
        </ul>
      )}
    </div>
  );
}
