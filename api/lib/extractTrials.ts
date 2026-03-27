import type { ClinicalTrial, PatientProfile } from "../../types/api";
import type { CTApiResponse, CTStudy } from "./types";

const CT_BASE = "https://clinicaltrials.gov/api/v2";

function parseAgeYears(ageStr: string | undefined): number | null {
  if (!ageStr) return null;
  const m = ageStr.match(/(\d+)\s*(year|month|week|day)/i);
  if (!m) return null;
  const n = parseInt(m[1]);
  const unit = m[2].toLowerCase();
  if (unit.startsWith("year")) return n;
  if (unit.startsWith("month")) return Math.floor(n / 12);
  if (unit.startsWith("week")) return Math.floor(n / 52);
  return Math.floor(n / 365);
}

async function fetchStudies(params: Record<string, string>): Promise<CTStudy[]> {
  const query = new URLSearchParams({
    "filter.overallStatus": "RECRUITING",
    pageSize: "20",
    ...params,
  });

  const res = await fetch(`${CT_BASE}/studies?${query}`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    console.warn(`CT.gov query failed (${res.status}):`, params);
    return [];
  }

  const data = (await res.json()) as CTApiResponse;
  return data.studies ?? [];
}

function toTrial(study: CTStudy): ClinicalTrial {
  const id = study.protocolSection.identificationModule.nctId;
  const locs = study.protocolSection.contactsLocationsModule?.locations ?? [];
  const locations = [...new Set(
    locs.map((l) => [l.city, l.country].filter(Boolean).join(", "))
  )];
  return {
    nctId: id,
    title: study.protocolSection.identificationModule.briefTitle,
    overallStatus: study.protocolSection.statusModule.overallStatus,
    conditions: study.protocolSection.conditionsModule?.conditions ?? [],
    locations,
    eligibilityCriteria: (study.protocolSection.eligibilityModule?.eligibilityCriteria ?? "").slice(0, 800),
    url: `https://clinicaltrials.gov/study/${id}`,
  };
}

function isEligible(study: CTStudy, profile: PatientProfile): boolean {
  const em = study.protocolSection.eligibilityModule;

  const trialSex = em?.sex?.toUpperCase();
  if (trialSex && trialSex !== "ALL" && profile.sex) {
    if (profile.sex.toUpperCase() !== trialSex) return false;
  }

  if (profile.age !== null) {
    const minAge = parseAgeYears(em?.minimumAge);
    const maxAge = parseAgeYears(em?.maximumAge);
    if (minAge !== null && profile.age < minAge) return false;
    if (maxAge !== null && profile.age > maxAge) return false;
  }

  return true;
}

// Search by each condition (query.cond) and all keywords combined (query.term),
// deduplicate by NCT ID, then filter by age/sex eligibility.
export async function fetchAndFilterTrials(profile: PatientProfile): Promise<ClinicalTrial[]> {
  const fetches: Promise<CTStudy[]>[] = [];

  for (const cond of profile.conditions) {
    fetches.push(fetchStudies({ "query.cond": cond }));
  }

  if (profile.keywords.length > 0) {
    fetches.push(fetchStudies({ "query.term": profile.keywords.join(" ") }));
  }

  if (fetches.length === 0) return [];

  const pages = await Promise.allSettled(fetches);

  const seen = new Set<string>();
  const candidates: CTStudy[] = [];

  for (const settled of pages) {
    if (settled.status === "rejected") continue;
    for (const study of settled.value) {
      const id = study.protocolSection.identificationModule.nctId;
      if (!seen.has(id)) {
        seen.add(id);
        candidates.push(study);
      }
    }
  }

  return candidates.filter((s) => isEligible(s, profile)).map(toTrial);
}
