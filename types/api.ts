export interface TranscriptRequest {
  transcript: string;
}

export interface ClinicalTrial {
  nctId: string;
  title: string;
  status: string;
  conditions: string[];
  interventions: string[];
  eligibilityCriteria: string;
  url: string;
}

export interface AnalysisResult {
  summary: string;
  extractedConditions: string[];
  medications: string[];
  recommendedTrials: ClinicalTrial[];
  analysisTimestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
