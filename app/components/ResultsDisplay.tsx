"use client";

import { AlertCircle } from "lucide-react";
import type { AnalysisResult } from "@/types/api";

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  error: string | null;
}

export default function ResultsDisplay({ result, error }: ResultsDisplayProps) {
  if (!error && !result) return null;

  return (
    <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {error && (
        <div className="flex items-start gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            Analysis Result
          </h3>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-zinc-400">
              Summary
            </p>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {result.summary}
            </p>
          </div>
          {result.extractedConditions.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                Identified Conditions
              </p>
              <div className="flex flex-wrap gap-2">
                {result.extractedConditions.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
          {result.medications.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                Medications
              </p>
              <div className="flex flex-wrap gap-2">
                {result.medications.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
          {result.recommendedTrials.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                Recommended Clinical Trials
              </p>
              <ul className="flex flex-col gap-2">
                {result.recommendedTrials.map((trial) => (
                  <li
                    key={trial.nctId}
                    className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800"
                  >
                    <a
                      href={trial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {trial.title}
                    </a>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {trial.nctId} · {trial.status}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-zinc-400">
            Analyzed at {new Date(result.analysisTimestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
