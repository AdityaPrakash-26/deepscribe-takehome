"use client";

import { AlertCircle } from "lucide-react";
import type { AnalysisResult, ClinicalTrial, PatientProfile } from "@/types/api";

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  error: string | null;
}

// ── Patient profile summary ────────────────────────────────────────────────

const CHIP_COLORS = {
  conditions: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  keywords: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
};

function ChipList({ items, color }: { items: string[]; color: string }) {
  if (items.length === 0) return <span className="text-xs text-zinc-400">None stated</span>;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
          {item}
        </span>
      ))}
    </div>
  );
}

function ProfileField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</p>
      {children}
    </div>
  );
}

function PatientProfileCard({ profile }: { profile: PatientProfile }) {
  const demographics = [
    profile.age ? `${profile.age} yo` : null,
    profile.sex,
    profile.location
      ? [profile.location.city, profile.location.state, profile.location.country]
          .filter(Boolean)
          .join(", ") || null
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Patient Profile</h4>
        {demographics && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{demographics}</span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <ProfileField label="Conditions">
          <ChipList items={profile.conditions} color={CHIP_COLORS.conditions} />
        </ProfileField>
        <ProfileField label="Keywords">
          <ChipList items={profile.keywords} color={CHIP_COLORS.keywords} />
        </ProfileField>
      </div>
    </div>
  );
}

// ── Trial card ─────────────────────────────────────────────────────────────

function TrialCard({ trial }: { trial: ClinicalTrial }) {
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
        <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {trial.overallStatus}
        </span>
      </div>

      <p className="mb-2 text-xs text-zinc-400">
        {trial.nctId}
        {trial.conditions.length > 0 && ` · ${trial.conditions.slice(0, 3).join(", ")}`}
      </p>

      {trial.locations.length > 0 && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {trial.locations.slice(0, 3).join(" · ")}
          {trial.locations.length > 3 && ` +${trial.locations.length - 3} more`}
        </p>
      )}
    </li>
  );
}

// ── Root component ─────────────────────────────────────────────────────────

export default function ResultsDisplay({ result, error }: ResultsDisplayProps) {
  if (!error && !result) return null;

  return (
    <div className="mt-6 flex flex-col gap-5">
      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <>
          <PatientProfileCard profile={result.patientProfile} />

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                Clinical Trial Matches
              </h4>
              <span className="text-xs text-zinc-400">
                {result.recommendedTrials.length} results · analyzed{" "}
                {new Date(result.analysisTimestamp).toLocaleTimeString()}
              </span>
            </div>

            {result.recommendedTrials.length === 0 ? (
              <p className="text-sm text-zinc-400">No matching trials found.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {result.recommendedTrials.map((trial) => (
                  <TrialCard key={trial.nctId} trial={trial} />
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
