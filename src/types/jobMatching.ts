
export interface MatchResult {
  score: number;
  missingSkills: string[];
  presentSkills: string[];
  suggestions: string[];
  highlightedJob: string;
  highlightedCV: string;
  // New fields for enhanced analysis
  sectionScores: {
    skills: number;
    experience: number;
    education: number;
    certifications: number;
  };
  keywordAnalysis: {
    present: string[];
    missing: string[];
  };
  experienceAlignment: {
    matchingExperiences: string[];
    experienceGaps: string[];
    suggestions: string[];
  };
  softSkills: {
    required: string[];
    present: string[];
    missing: string[];
  };
  actionableSummary: string[];
}
