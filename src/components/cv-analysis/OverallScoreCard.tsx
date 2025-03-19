
import { Card } from "@/components/ui/card";
import type { CVScoreData } from "@/types/cvAnalysis";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

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

  const getATSMessage = () => {
    if (score >= 71) {
      return {
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        message: "Your CV is properly formatted for Applicant Tracking Systems. It will be parsed correctly by most HR software.",
        bgColor: "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800",
        textColor: "text-green-800 dark:text-green-200"
      };
    } else if (score >= 31) {
      return {
        icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
        message: "Your CV needs improvement for better ATS compatibility. Some information may not be parsed correctly.",
        bgColor: "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800",
        textColor: "text-amber-800 dark:text-amber-200"
      };
    } else {
      return {
        icon: <XCircle className="w-5 h-5 text-red-500" />,
        message: "Your CV is not properly formatted for ATS systems. It will likely be rejected by automated screening.",
        bgColor: "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800",
        textColor: "text-red-800 dark:text-red-200"
      };
    }
  };

  const atsInfo = getATSMessage();

  return (
    <Card className="md:col-span-4 border-t-4 border-t-primary bg-white dark:bg-gray-800">
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <div className={`rounded-full w-28 h-28 flex items-center justify-center mb-4 ${getBgColorClass(score)}`}>
          <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">Overall Score</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {fileName ? `Analysis for: ${fileName}` : 'Analysis of your CV'}
        </p>
        
        {/* ATS Compatibility Message */}
        <div className={`mt-4 p-3 rounded-md border ${atsInfo.bgColor} flex items-start gap-2 text-left`}>
          {atsInfo.icon}
          <p className={`text-sm ${atsInfo.textColor}`}>
            {atsInfo.message}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default OverallScoreCard;
