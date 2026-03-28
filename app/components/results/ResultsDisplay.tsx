"use client";

import { AlertCircle } from "lucide-react";
import type { AnalysisResult } from "@/types/api";
import PatientProfileCard from "./PatientProfileCard";
import SkeletonResults from "./SkeletonResults";
import TrialList from "./TrialList";

interface ResultsDisplayProps {
  result: AnalysisResult | null;
  error: string | null;
  isLoading?: boolean;
}

export default function ResultsDisplay({ result, error, isLoading }: ResultsDisplayProps) {
  if (isLoading && !result && !error) return <SkeletonResults />;
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
          <TrialList result={result} />
        </>
      )}
    </div>
  );
}
