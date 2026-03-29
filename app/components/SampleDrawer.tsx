"use client";

import { X } from "lucide-react";
import { sampleTranscripts } from "@/data/sample-transcripts";

interface SampleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTranscript: (transcript: string) => void;
}

const categoryColors: Record<string, string> = {
  "Infectious Disease":
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Endocrinology:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Cardiology:
    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export default function SampleDrawer({
  isOpen,
  onClose,
  onSelectTranscript,
}: SampleDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-zinc-900 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Sample transcripts"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Sample Transcripts
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Transcript list */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
            Click a transcript to load it into the editor.
          </p>
          <ul className="flex flex-col gap-3">
            {sampleTranscripts.map((sample) => (
              <li key={sample.id}>
                <button
                  onClick={() => {
                    onSelectTranscript(sample.transcript);
                    onClose();
                  }}
                  className="w-full rounded-xl border border-zinc-100 bg-zinc-50 p-4 text-left transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        categoryColors[sample.category] ??
                        "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {sample.category}
                    </span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      {sample.wordCount}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                    {sample.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {sample.description}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
