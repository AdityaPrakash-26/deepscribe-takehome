import type { FetchedTrial } from "../../types/api";

// Internal types for the ClinicalTrials.gov v2 API response and screening helpers.
// Only fields we actually use are typed; everything else is unknown.

export interface CTLocation {
  city?: string;
  state?: string;
  country?: string;
  status?: string;
}

export interface CTIntervention {
  type?: string;
  name?: string;
}

export interface CTStudy {
  protocolSection: {
    identificationModule: {
      nctId: string;
      briefTitle: string;
    };
    statusModule: {
      overallStatus: string;
    };
    descriptionModule?: {
      briefSummary?: string;
    };
    conditionsModule?: {
      conditions?: string[];
    };
    armsInterventionsModule?: {
      interventions?: CTIntervention[];
    };
    eligibilityModule?: {
      eligibilityCriteria?: string;
      minimumAge?: string;
      maximumAge?: string;
      sex?: string; // "MALE" | "FEMALE" | "ALL"
      healthyVolunteers?: boolean;
      stdAges?: string[];
      studyPopulation?: string;
      samplingMethod?: string;
    };
    contactsLocationsModule?: {
      locations?: CTLocation[];
    };
  };
}

export interface CTApiResponse {
  studies?: CTStudy[];
  nextPageToken?: string;
  totalCount?: number;
}

export interface ParsedTrialCriteria {
  trial: FetchedTrial;
  inclusionCriteria: string[];
  exclusionCriteria: string[];
}

export interface ParsedCriteria {
  inclusionCriteria: string[];
  exclusionCriteria: string[];
  criteriaParsedSuccessfully: boolean;
}

export interface LlmScreeningResult {
  trial_id?: string;
  inclusion_results?: boolean[];
  exclusion_results?: boolean[];
}
