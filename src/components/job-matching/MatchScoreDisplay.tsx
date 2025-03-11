
import { Progress } from "@/components/ui/progress";
import { Award } from "lucide-react";
import { MatchResult } from "@/types/jobMatching";

interface MatchScoreDisplayProps {
  score: number;
}

export const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-amber-500";
  return "text-red-500";
};

export const getProgressColor = (score: number) => {
  if (score >= 80) return "bg-green-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
};

const MatchScoreDisplay = ({ score }: MatchScoreDisplayProps) => {
  return (
    <div className="pb-6 border-b">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <Award size={18} />
        <span>Overall Match Score</span>
        <span className={`text-xl font-bold ${getScoreColor(score)}`}>
          {score}%
        </span>
      </h3>
      <Progress value={score} className={getProgressColor(score)} />
    </div>
  );
};

export default MatchScoreDisplay;
