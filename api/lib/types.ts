// Internal types for the ClinicalTrials.gov v2 API response.
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
