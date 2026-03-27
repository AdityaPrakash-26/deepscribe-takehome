import type { ClinicalTrial, PatientProfile } from "../../types/api";
import type { CTApiResponse, CTStudy } from "./types";

const CT_BASE = "https://clinicaltrials.gov/api/v2";

// Build all query parameters from the patient profile.
// - query.cond:        conditions joined with OR (Essie syntax)
// - query.term:        keywords as quoted OR phrases for broader matching
// - filter.overallStatus: only recruiting trials
// - filter.advanced:  age and sex constraints (Essie AREA/RANGE expressions)
function buildParams(profile: PatientProfile): URLSearchParams {
  const params = new URLSearchParams();
  params.set("filter.overallStatus", "RECRUITING");

  if (profile.conditions.length > 0) {
    params.set("query.cond", profile.conditions.join(" OR "));
  }

  // Strip bare numbers from keywords (causes Essie parse errors), quote each phrase, join with OR.
  const keywords = profile.keywords
    .map((k) => k.split(/\s+/).filter((w) => !/^\d+(\.\d+)?$/.test(w)).join(" ").trim())
    .filter(Boolean);

  if (keywords.length > 0) {
    params.set("query.term", keywords.map((k) => `"${k}"`).join(" OR "));
  }

  const advanced: string[] = [];

  if (profile.age !== null) {
    advanced.push(
      `AREA[MinimumAge]RANGE[MIN, ${profile.age} years] AND AREA[MaximumAge]RANGE[${profile.age} years, MAX]`
    );
  }

  if (profile.sex === "Male" || profile.sex === "Female") {
    advanced.push(`(AREA[Sex]ALL OR AREA[Sex]${profile.sex.toUpperCase()})`);
  }

  if (profile.location) {
    const { city, state, country } = profile.location;
    const locParts: string[] = [];
    if (city) locParts.push(`AREA[LocationCity]"${city}"`);
    if (state) locParts.push(`AREA[LocationState]"${state}"`);
    if (country) locParts.push(`AREA[LocationCountry]"${country}"`);

    if (locParts.length === 1) {
      advanced.push(locParts[0]);
    } else if (locParts.length > 1) {
      advanced.push(`SEARCH[Location](${locParts.join(" AND ")})`);
    }
  }

  if (advanced.length > 0) {
    params.set("filter.advanced", advanced.join(" AND "));
  }

  console.log("Constructed CT.gov query params:", params.toString());

  return params;
}

// Fetch studies from CT.gov and map to ClinicalTrial objects.
export async function fetchAndFilterTrials(profile: PatientProfile): Promise<ClinicalTrial[]> {
  const params = buildParams(profile);

  const res = await fetch(`${CT_BASE}/studies?${params}`, {
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    console.warn(`CT.gov request failed (${res.status})`);
    return [];
  }

  const data = (await res.json()) as CTApiResponse;
  const studies = data.studies ?? [];

  return studies.map((study: CTStudy) => {
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
  });
}
