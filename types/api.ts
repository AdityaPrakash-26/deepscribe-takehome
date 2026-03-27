export interface TranscriptRequest {
  transcript: string;
}

export interface PatientProfile {
  age: number | null;
  sex: "Male" | "Female" | "Other" | null;
  location: { city: string | null; state: string | null; country: string | null } | null;
  conditions: string[];
  keywords: string[];
}

export interface ClinicalTrial {
  nctId: string;
  title: string;
  overallStatus: string;
  conditions: string[];
  locations: string[];
  eligibilityCriteria: string;
  url: string;
}

export interface AnalysisResult {
  patientProfile: PatientProfile;
  recommendedTrials: ClinicalTrial[];
  analysisTimestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
