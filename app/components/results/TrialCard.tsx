"use client";

import { useState } from "react";
import type { ClinicalTrial, EligibilityStatus } from "@/types/api";

export const ELIGIBILITY_CONFIG: Record<
  EligibilityStatus,
  { label: string; badge: string; description: string }
> = {
  eligible: {
    label: "Likely Eligible",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    description: "Patient clearly meets all stated inclusion criteria with no exclusion violations.",
  },
  potentially_eligible: {
    label: "Potentially Eligible",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    description: "Patient meets some criteria but the transcript is missing information needed to confirm all requirements.",
  },
  likely_ineligible: {
    label: "Likely Ineligible",
    badge: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
    description: "Patient appears to violate one or more exclusion criteria or fails a key inclusion requirement.",
  },
};

export default function TrialCard({ trial }: { trial: ClinicalTrial }) {
  const [expanded, setExpanded] = useState(false);
  const [criteriaOpen, setCriteriaOpen] = useState(false);
  const elig = trial.eligibility;
  const eligConfig = elig ? ELIGIBILITY_CONFIG[elig.status] : null;

  return (
    <li className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <a
          href={trial.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium leading-snug text-zinc-800 hover:underline dark:text-zinc-100"
        >
          {trial.title}
        </a>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
            {trial.overallStatus}
          </span>
          {eligConfig && (
            <span
              title={eligConfig.description}
              className={`cursor-help rounded-full px-2 py-0.5 text-xs font-medium ${eligConfig.badge}`}
            >
              {eligConfig.label}
            </span>
          )}
          {!eligConfig && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-400 dark:bg-zinc-800">
              Not Screened
            </span>
          )}
        </div>
      </div>

      <p className="mb-2 flex flex-wrap items-center gap-x-1.5 text-xs text-zinc-400">
        <span className="font-mono">Trial ID: {trial.nctId}</span>
        {trial.conditions.length > 0 && (
          <>
            <span className="text-zinc-300 dark:text-zinc-600">·</span>
            <span>
              Studying: {trial.conditions.slice(0, 3).join(", ")}
              {trial.conditions.length > 3 ? ` +${trial.conditions.length - 3} more` : ""}
            </span>
          </>
        )}
      </p>

      {elig?.reason && (
        <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">AI Reasoning: {elig.reason}</p>
      )}

      {elig && (elig.matchedCriteria.length > 0 || elig.concerns.length > 0) && (
        <div>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mb-1 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 underline"
          >
            {expanded ? "Hide eligibility breakdown" : "View eligibility breakdown"}
          </button>
          {expanded && (
            <div className="mt-1 flex flex-col gap-2">
              {elig.matchedCriteria.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-green-600 dark:text-green-400">Patient meets these criteria</p>
                  <ul className="mt-0.5 list-disc pl-4">
                    {elig.matchedCriteria.map((c) => (
                      <li key={c} className="text-xs text-zinc-500 dark:text-zinc-400">{c}</li>
                    ))}
                  </ul>
                </div>
              )}
              {elig.concerns.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-red-600 dark:text-red-400">Potential barriers to enrollment</p>
                  <ul className="mt-0.5 list-disc pl-4">
                    {elig.concerns.map((c) => (
                      <li key={c} className="text-xs text-zinc-500 dark:text-zinc-400">{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {trial.locations.length > 0 && (
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          {trial.locations.slice(0, 3).join(" · ")}
          {trial.locations.length > 3 && ` +${trial.locations.length - 3} more`}
        </p>
      )}

      {trial.eligibilityCriteria && (
        <div className="mt-2">
          <button
            onClick={() => setCriteriaOpen((v) => !v)}
            className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 underline"
          >
            {criteriaOpen ? "Hide eligibility criteria" : "View full eligibility criteria"}
          </button>
          {criteriaOpen && (
            <pre className="mt-1.5 max-h-60 overflow-auto whitespace-pre-wrap rounded-lg border border-zinc-100 bg-zinc-50 p-3 text-xs leading-relaxed text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-400">
              {trial.eligibilityCriteria}
            </pre>
          )}
        </div>
      )}
    </li>
  );
}
