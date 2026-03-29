"use client";

import { useState } from "react";
import type { CriterionResult, ScreenedTrial } from "@/types/api";

type EligibilityDisplayStatus = "passes_auto_screen" | "fails_auto_screen";

export const ELIGIBILITY_CONFIG: Record<
  EligibilityDisplayStatus,
  { label: string; badge: string; description: string }
> = {
  passes_auto_screen: {
    label: "Eligible",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    description: "All inclusion criteria met, no exclusion criteria triggered.",
  },
  fails_auto_screen: {
    label: "Ineligible",
    badge: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300",
    description: "One or more criteria not met or an exclusion was triggered.",
  },
};

function CriteriaSubTable({
  title,
  rows,
}: {
  title: string;
  rows: { criterion: string; status: string; pass: boolean }[];
}) {
  if (rows.length === 0) return null;

  return (
    <div>
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {title}
      </p>
      <table className="w-full border-collapse text-xs">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-zinc-100 dark:border-zinc-800 last:border-0"
            >
              <td className="py-2 pr-4 align-top leading-relaxed text-zinc-600 dark:text-zinc-300">
                {row.criterion}
              </td>
              <td className="py-2 text-right align-top whitespace-nowrap">
                <span
                  className={`rounded-full px-2 py-0.5 font-medium ${
                    row.pass
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function LocationsList({ locations }: { locations: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 3;

  if (locations.length === 0) return null;

  const visible = expanded ? locations : locations.slice(0, LIMIT);

  return (
    <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
      {visible.join(" | ")}
      {locations.length > LIMIT && (
        <>
          {" "}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            {expanded ? "Show less" : `+${locations.length - LIMIT} more`}
          </button>
        </>
      )}
    </p>
  );
}

export default function TrialCard({ trial }: { trial: ScreenedTrial }) {
  const [criteriaOpen, setCriteriaOpen] = useState(false);
  const eligibility = trial.eligibility;

  const displayStatus = eligibility
    ? eligibility.final_eligibility
      ? "passes_auto_screen"
      : "fails_auto_screen"
    : null;
  const displayConfig = displayStatus ? ELIGIBILITY_CONFIG[displayStatus] : null;

  const inclusionRows: { criterion: string; status: string; pass: boolean }[] =
    eligibility?.criteria_parsed
      ? eligibility.inclusion_results.map((r: CriterionResult) => ({
          criterion: r.criterion,
          status: r.result ? "Met" : "Not Met",
          pass: r.result,
        }))
      : [];

  const exclusionRows: { criterion: string; status: string; pass: boolean }[] =
    eligibility?.criteria_parsed
      ? eligibility.exclusion_results.map((r: CriterionResult) => ({
          criterion: r.criterion,
          status: r.result ? "Triggered" : "Clear",
          pass: !r.result,
        }))
      : [];

  const hasCriteria = inclusionRows.length > 0 || exclusionRows.length > 0;

  return (
    <li className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
      {/* Header */}
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
          {displayConfig && (
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${displayConfig.badge}`}>
              {displayConfig.label}
            </span>
          )}
          {!displayConfig && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-400 dark:bg-zinc-800">
              Not Screened
            </span>
          )}
        </div>
      </div>

      {/* Meta */}
      <p className="mb-3 flex flex-wrap items-center gap-x-1.5 text-xs text-zinc-400">
        <span className="font-mono">Trial ID: {trial.nctId}</span>
        {trial.conditions.length > 0 && (
          <>
            <span>|</span>
            <span>
              Studying: {trial.conditions.slice(0, 3).join(", ")}
              {trial.conditions.length > 3 ? ` +${trial.conditions.length - 3} more` : ""}
            </span>
          </>
        )}
      </p>

      {/* Description */}
      {trial.briefSummary && (
        <p className="mb-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {trial.briefSummary}
        </p>
      )}

      {/* Parse failure notice */}
      {eligibility && !eligibility.criteria_parsed && (
        <p className="mb-2 text-xs text-amber-700 dark:text-amber-400">
          The eligibility text could not be parsed into structured criteria.
        </p>
      )}

      {/* Criteria table */}
      {hasCriteria && (
        <div className="mt-1">
          <button
            onClick={() => setCriteriaOpen((v) => !v)}
            className="mb-2 text-xs text-zinc-400 underline hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            {criteriaOpen ? "Hide criteria" : "View criteria"}
          </button>

          {criteriaOpen && (
            <div className="flex flex-col gap-5 rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/40">
              <CriteriaSubTable title="Inclusion Criteria" rows={inclusionRows} />
              <CriteriaSubTable title="Exclusion Criteria" rows={exclusionRows} />
            </div>
          )}
        </div>
      )}

      {/* Locations */}
      <LocationsList locations={trial.locations} />
    </li>
  );
}
