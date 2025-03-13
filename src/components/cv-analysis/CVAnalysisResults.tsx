
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from 'lucide-react';

interface CVScoreData {
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

interface CVAnalysisResultsProps {
  scoreData: CVScoreData;
  fileName?: string;
}

const CVAnalysisResults = ({ scoreData, fileName }: CVAnalysisResultsProps) => {
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="col-span-1 md:col-span-2 glass-card overflow-hidden">
        <CardHeader className="border-b bg-secondary/40">
          <CardTitle className="flex items-center justify-between">
            <span>CV Score Overview</span>
            <span className={`text-2xl font-bold ${getScoreColor(scoreData.overallScore)}`}>
              {scoreData.overallScore}/100
            </span>
          </CardTitle>
          <CardDescription>
            {fileName ? `Analysis for: ${fileName}` : 'Analysis of your CV'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Relevance</span>
                <span className={`text-sm ${getScoreColor(scoreData.sections.relevance)}`}>
                  {scoreData.sections.relevance}%
                </span>
              </div>
              <Progress value={scoreData.sections.relevance} className={getProgressColor(scoreData.sections.relevance)} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Structure</span>
                <span className={`text-sm ${getScoreColor(scoreData.sections.structure)}`}>
                  {scoreData.sections.structure}%
                </span>
              </div>
              <Progress value={scoreData.sections.structure} className={getProgressColor(scoreData.sections.structure)} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Clarity</span>
                <span className={`text-sm ${getScoreColor(scoreData.sections.clarity)}`}>
                  {scoreData.sections.clarity}%
                </span>
              </div>
              <Progress value={scoreData.sections.clarity} className={getProgressColor(scoreData.sections.clarity)} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Impact</span>
                <span className={`text-sm ${getScoreColor(scoreData.sections.impact)}`}>
                  {scoreData.sections.impact}%
                </span>
              </div>
              <Progress value={scoreData.sections.impact} className={getProgressColor(scoreData.sections.impact)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card overflow-hidden">
        <CardHeader className={`border-b ${scoreData.atsCompatible ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}`}>
          <CardTitle className="flex items-center gap-2">
            {scoreData.atsCompatible ? (
              <>
                <CheckCircle size={20} className="text-green-500" />
                <span>ATS Compatible</span>
              </>
            ) : (
              <>
                <AlertCircle size={20} className="text-red-500" />
                <span>ATS Issues Found</span>
              </>
            )}
          </CardTitle>
          <CardDescription>
            Applicant Tracking System Analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {scoreData.atsCompatible ? (
            <p className="text-sm text-muted-foreground">
              Your CV is properly formatted for Applicant Tracking Systems. It will be parsed correctly by most HR software.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              We've detected formatting issues that may cause problems with ATS systems. Check our suggestions tab for details.
            </p>
          )}

          {scoreData.missingKeywords.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Consider adding these keywords:</h4>
              <div className="flex flex-wrap gap-2">
                {scoreData.missingKeywords.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-secondary rounded-full text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CVAnalysisResults;
