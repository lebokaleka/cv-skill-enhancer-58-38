
export interface MatchResult {
  score: number;
  missingSkills: string[];
  presentSkills: string[];
  suggestions: string[];
  highlightedJob: string;
  highlightedCV: string;
}
