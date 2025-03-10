
export interface CVScoreData {
  overallScore: number;
  sections: {
    relevance: number;
    structure: number;
    clarity: number;
    impact: number;
  };
  suggestions: {
    high: string[];
    medium: string[];
    low: string[];
  };
  atsCompatible: boolean;
  missingKeywords: string[];
}
