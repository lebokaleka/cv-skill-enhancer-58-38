
import { Card } from "@/components/ui/card";
import type { CVScoreData } from "@/types/cvAnalysis";

interface OverallScoreCardProps {
  score: number;
  fileName?: string;
}

const OverallScoreCard = ({ score, fileName }: OverallScoreCardProps) => {
  const getBgColorClass = (score: number) => {
    if (score >= 71) return "bg-green-50 dark:bg-green-900/10";
    if (score >= 31) return "bg-amber-50 dark:bg-amber-900/10";
    return "bg-red-50 dark:bg-red-900/10";
  };

  const getScoreColor = (score: number) => {
    if (score >= 71) return "text-green-500";
    if (score >= 31) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <Card className="md:col-span-4 border-t-4 border-t-primary bg-white dark:bg-gray-800">
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <div className={`rounded-full w-28 h-28 flex items-center justify-center mb-4 ${getBgColorClass(score)}`}>
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">Overall Score</h3>
        <p className="text-sm text-muted-foreground">
          {fileName ? `Analysis for: ${fileName}` : 'Analysis of your CV'}
        </p>
      </div>
    </Card>
  );
};

export default OverallScoreCard;
