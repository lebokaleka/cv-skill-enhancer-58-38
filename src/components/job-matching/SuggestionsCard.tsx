
import { MatchResult } from "@/types/jobMatching";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Lightbulb } from 'lucide-react';

interface SuggestionsCardProps {
  matchResult: MatchResult;
  className?: string;
  style?: React.CSSProperties;
}

const SuggestionsCard = ({ matchResult, className, style }: SuggestionsCardProps) => {
  return (
    <Card className={`glass-card overflow-hidden ${className || ''}`} style={style}>
      <CardHeader className="border-b bg-secondary/40">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb size={20} className="text-amber-500" />
          <span>Improvement Suggestions</span>
        </CardTitle>
        <CardDescription>
          Tailored recommendations to improve your match score
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-4">
          {matchResult.suggestions.map((suggestion, index) => (
            <li key={index} className="flex gap-3 items-start p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10">
              <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p>{suggestion}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SuggestionsCard;
