export interface TranscriptRequest {
  transcript: string;
}

export interface PatientProfile {
  age: number | null;
  sex: "Male" | "Female" | "Other" | null;
  pregnancyStatus: "pregnant" | "not pregnant" | null;
  diagnoses: string[];
  symptoms: string[];
  medications: string[];
  biomarkers: string[];
  priorTherapies: string[];
  comorbidities: string[];
  location: { city: string | null; state: string | null; country: string | null } | null;
}

export type EligibilityStatus = "eligible" | "potentially_eligible" | "likely_ineligible";

export interface EligibilityAssessment {
  status: EligibilityStatus;
  reason: string;
  matchedCriteria: string[];
  concerns: string[];
}

export interface ClinicalTrial {
  nctId: string;
  title: string;
  overallStatus: string;
  conditions: string[];
  locations: string[];
  eligibilityCriteria: string;
  url: string;
  minimumAge: string | null;
  maximumAge: string | null;
  acceptedSex: string | null;
  healthyVolunteers: boolean;
  stdAges: string[];
  eligibility: EligibilityAssessment | null;
}

export interface AnalysisResult {
  patientProfile: PatientProfile;
  recommendedTrials: ClinicalTrial[];
  analysisTimestamp: string;
  screeningCompleted: boolean;
  screeningError: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
