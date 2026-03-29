export interface TranscriptRequest {
  transcript: string;
}

export interface PatientProfile {
  age: number | null;
  sex: "Male" | "Female" | "Other" | null;
  diagnoses: string[];
  symptoms: string[];
  medications: string[];
  biomarkers: string[];
  location: { city: string | null; state: string | null; country: string | null } | null;
}

export interface CriterionResult {
  criterion: string;
  result: boolean;
}

export interface EligibilityAssessment {
  trial_id: string;
  inclusion_results: CriterionResult[];
  exclusion_results: CriterionResult[];
  final_eligibility: boolean;
  criteria_parsed: boolean;
}

export interface TrialSummary {
  nctId: string;
  title: string;
  briefSummary: string;
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
}

export type FetchedTrial = TrialSummary;

export interface ScreenedTrial extends TrialSummary {
  eligibility: EligibilityAssessment | null;
}

export interface AnalysisResult {
  patientProfile: PatientProfile;
  recommendedTrials: ScreenedTrial[];
  analysisTimestamp: string;
  screeningCompleted: boolean;
  screeningError: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
