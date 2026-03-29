import type { PatientProfile } from "@/types/api";

const CHIP_COLORS = {
  diagnoses: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  symptoms: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
  medications: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  biomarkers: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
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

export default function PatientProfileCard({ profile }: { profile: PatientProfile }) {
  const demographicParts = [
    profile.age !== null ? `${profile.age} yo` : null,
    profile.sex,
    profile.location
      ? [profile.location.city, profile.location.state, profile.location.country]
          .filter(Boolean)
          .join(", ") || null
      : null,
  ]
    .filter(Boolean)
    .join(" | ");

  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/40">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">Patient Profile</h4>
        {demographicParts && (
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{demographicParts}</span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <ProfileField label="Diagnoses">
          <ChipList items={profile.diagnoses} color={CHIP_COLORS.diagnoses} />
        </ProfileField>

        {profile.symptoms.length > 0 && (
          <ProfileField label="Symptoms">
            <ChipList items={profile.symptoms} color={CHIP_COLORS.symptoms} />
          </ProfileField>
        )}

        {profile.medications.length > 0 && (
          <ProfileField label="Medications">
            <ChipList items={profile.medications} color={CHIP_COLORS.medications} />
          </ProfileField>
        )}

        {profile.biomarkers.length > 0 && (
          <ProfileField label="Biomarkers">
            <ChipList items={profile.biomarkers} color={CHIP_COLORS.biomarkers} />
          </ProfileField>
        )}
      </div>
    </div>
  );
}
