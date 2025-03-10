
import { MatchResult } from "@/types/jobMatching";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle } from 'lucide-react';

interface MatchScoreCardProps {
  matchResult: MatchResult;
}

const MatchScoreCard = ({ matchResult }: MatchScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <Card className="glass-card overflow-hidden animate-scale-in">
      <CardHeader className="border-b bg-secondary/40">
        <CardTitle className="flex items-center justify-between">
          <span>Match Score</span>
          <span className={`text-2xl font-bold ${getScoreColor(matchResult.score)}`}>
            {matchResult.score}%
          </span>
        </CardTitle>
        <CardDescription>
          How well your CV matches the job requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Overall Compatibility</h3>
            <Progress value={matchResult.score} className={getProgressColor(matchResult.score)} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                <span>Skills You Have</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchResult.presentSkills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <XCircle size={16} className="text-red-500" />
                <span>Missing Skills</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchResult.missingSkills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchScoreCard;
