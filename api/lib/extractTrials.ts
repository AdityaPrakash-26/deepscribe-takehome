import type { FetchedTrial, PatientProfile } from "../../types/api";
import type { CTApiResponse, CTStudy } from "./types";
import { buildKeywordTerms } from "./utils";

const CT_BASE = "https://clinicaltrials.gov/api/v2";

function buildParams(profile: PatientProfile): URLSearchParams {
  const params = new URLSearchParams();
  params.set("filter.overallStatus", "RECRUITING");

  if (profile.diagnoses.length > 0) {
    params.set("query.cond", profile.diagnoses.join(" OR "));
  }

  const keywords = buildKeywordTerms(profile);
  if (keywords.length > 0) {
    params.set("query.term", keywords.map((keyword) => `"${keyword}"`).join(" OR "));
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

export async function fetchAndFilterTrials(profile: PatientProfile): Promise<FetchedTrial[]> {
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
      locs.map((location) => [location.city, location.country].filter(Boolean).join(", "))
    )];
    const elig = study.protocolSection.eligibilityModule;

    return {
      nctId: id,
      title: study.protocolSection.identificationModule.briefTitle,
      briefSummary: study.protocolSection.descriptionModule?.briefSummary ?? "",
      overallStatus: study.protocolSection.statusModule.overallStatus,
      conditions: study.protocolSection.conditionsModule?.conditions ?? [],
      locations,
      eligibilityCriteria: elig?.eligibilityCriteria ?? "",
      url: `https://clinicaltrials.gov/study/${id}`,
      minimumAge: elig?.minimumAge ?? null,
      maximumAge: elig?.maximumAge ?? null,
      acceptedSex: elig?.sex ?? null,
      healthyVolunteers: elig?.healthyVolunteers ?? false,
      stdAges: elig?.stdAges ?? [],
    };
  });
}
