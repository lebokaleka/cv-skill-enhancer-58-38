
export interface Suggestion {
  text: string;
  category: 'formatting' | 'content' | 'ats' | 'skills' | 'grammar' | 'customization';
  priority: 'critical' | 'recommended' | 'nice';
  example?: string;
}

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
  structuredSuggestions?: Suggestion[];
  atsCompatible: boolean;
  missingKeywords: string[];
}
