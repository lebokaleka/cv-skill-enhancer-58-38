
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, BarChart, FileText, Award, Zap, BrainCircuit, Target } from 'lucide-react';
import type { CVScoreData } from "@/types/cvAnalysis";

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

  const getBgColorClass = (score: number) => {
    if (score >= 80) return "bg-green-50 dark:bg-green-900/10";
    if (score >= 60) return "bg-amber-50 dark:bg-amber-900/10";
    return "bg-red-50 dark:bg-red-900/10";
  };

  return (
    <div className="px-6 pt-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Overall Score Card */}
        <Card className="md:col-span-4 glass-card overflow-hidden border-t-4 border-t-primary">
          <div className="p-6 flex flex-col items-center justify-center text-center">
            <div className={`rounded-full w-28 h-28 flex items-center justify-center mb-4 ${getBgColorClass(scoreData.overallScore)}`}>
              <span className={`text-4xl font-bold ${getScoreColor(scoreData.overallScore)}`}>
                {scoreData.overallScore}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">Overall Score</h3>
            <p className="text-sm text-muted-foreground">
              {fileName ? `Analysis for: ${fileName}` : 'Analysis of your CV'}
            </p>
          </div>
        </Card>

        {/* Section Scores */}
        <Card className="md:col-span-8 glass-card overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart size={20} className="text-primary" />
              Section Breakdown
            </CardTitle>
            <CardDescription>Detailed score by section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Target size={18} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Relevance</span>
                      <span className={`text-sm ${getScoreColor(scoreData.sections.relevance)}`}>
                        {scoreData.sections.relevance}%
                      </span>
                    </div>
                    <Progress value={scoreData.sections.relevance} className={getProgressColor(scoreData.sections.relevance)} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Structure</span>
                      <span className={`text-sm ${getScoreColor(scoreData.sections.structure)}`}>
                        {scoreData.sections.structure}%
                      </span>
                    </div>
                    <Progress value={scoreData.sections.structure} className={getProgressColor(scoreData.sections.structure)} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Zap size={18} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Clarity</span>
                      <span className={`text-sm ${getScoreColor(scoreData.sections.clarity)}`}>
                        {scoreData.sections.clarity}%
                      </span>
                    </div>
                    <Progress value={scoreData.sections.clarity} className={getProgressColor(scoreData.sections.clarity)} />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Impact</span>
                      <span className={`text-sm ${getScoreColor(scoreData.sections.impact)}`}>
                        {scoreData.sections.impact}%
                      </span>
                    </div>
                    <Progress value={scoreData.sections.impact} className={getProgressColor(scoreData.sections.impact)} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ATS Compatibility */}
        <Card className="md:col-span-12 glass-card overflow-hidden">
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
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                {scoreData.atsCompatible ? (
                  <div className="flex gap-3 items-start p-4 rounded-lg bg-green-50 dark:bg-green-900/10">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                    <p className="text-sm">
                      Your CV is properly formatted for Applicant Tracking Systems. It will be parsed correctly by most HR software.
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-3 items-start p-4 rounded-lg bg-red-50 dark:bg-red-900/10">
                    <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm">
                      We've detected formatting issues that may cause problems with ATS systems. Check our suggestions tab for details.
                    </p>
                  </div>
                )}
              </div>

              {scoreData.missingKeywords.length > 0 && (
                <div className="flex-1">
                  <div className="flex gap-3 items-start p-4 rounded-lg bg-secondary/10">
                    <BrainCircuit size={18} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium mb-2">Recommended keywords to add:</h4>
                      <div className="flex flex-wrap gap-2">
                        {scoreData.missingKeywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-secondary/20 rounded-full text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CVAnalysisResults;
