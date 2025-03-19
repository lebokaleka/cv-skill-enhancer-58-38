
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, BarChart, FileText, Award, Zap, BrainCircuit, Target, LayoutPanelTop, MessageSquareText, Search, Briefcase, Type } from 'lucide-react';
import type { CVScoreData } from "@/types/cvAnalysis";

interface CVAnalysisResultsProps {
  scoreData: CVScoreData;
  fileName?: string;
}

const CVAnalysisResults = ({ scoreData, fileName }: CVAnalysisResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 71) return "text-green-500";
    if (score >= 31) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 71) return "bg-green-500";
    if (score >= 31) return "bg-amber-500";
    return "bg-red-500";
  };

  const getBgColorClass = (score: number) => {
    if (score >= 71) return "bg-green-50 dark:bg-green-900/10";
    if (score >= 31) return "bg-amber-50 dark:bg-amber-900/10";
    return "bg-red-50 dark:bg-red-900/10";
  };

  return (
    <div className="px-6 pt-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Overall Score Card */}
        <Card className="md:col-span-4 border-t-4 border-t-primary bg-white dark:bg-gray-800">
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
        <Card className="md:col-span-8 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart size={20} className="text-primary" />
              Section Breakdown
            </CardTitle>
            <CardDescription>Detailed score by section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Formatting & Readability */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <LayoutPanelTop size={18} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Formatting & Readability</span>
                      <span className={`text-sm ${getScoreColor(scoreData.sections.formattingReadability)}`}>
                        {scoreData.sections.formattingReadability}%
                      </span>
                    </div>
                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-300">
                      <div 
                        className={`h-full transition-all ${getProgressColor(scoreData.sections.formattingReadability)}`}
                        style={{ width: `${scoreData.sections.formattingReadability}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content & Clarity */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <MessageSquareText size={18} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Content & Clarity</span>
                      <span className={`text-sm ${getScoreColor(scoreData.sections.contentClarity)}`}>
                        {scoreData.sections.contentClarity}%
                      </span>
                    </div>
                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-300">
                      <div 
                        className={`h-full transition-all ${getProgressColor(scoreData.sections.contentClarity)}`}
                        style={{ width: `${scoreData.sections.contentClarity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* ATS Optimization */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Search size={18} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">ATS Optimization</span>
                      <span className={`text-sm ${getScoreColor(scoreData.sections.atsOptimization)}`}>
                        {scoreData.sections.atsOptimization}%
                      </span>
                    </div>
                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-300">
                      <div 
                        className={`h-full transition-all ${getProgressColor(scoreData.sections.atsOptimization)}`}
                        style={{ width: `${scoreData.sections.atsOptimization}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Skills & Experience */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Skills & Experience</span>
                      <span className={`text-sm ${getScoreColor(scoreData.sections.skillsExperience)}`}>
                        {scoreData.sections.skillsExperience}%
                      </span>
                    </div>
                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-300">
                      <div 
                        className={`h-full transition-all ${getProgressColor(scoreData.sections.skillsExperience)}`}
                        style={{ width: `${scoreData.sections.skillsExperience}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Grammar & Language */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Type size={18} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Grammar & Language</span>
                      <span className={`text-sm ${getScoreColor(scoreData.sections.grammarLanguage)}`}>
                        {scoreData.sections.grammarLanguage}%
                      </span>
                    </div>
                    <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-300">
                      <div 
                        className={`h-full transition-all ${getProgressColor(scoreData.sections.grammarLanguage)}`}
                        style={{ width: `${scoreData.sections.grammarLanguage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ATS Compatibility */}
        <Card className="md:col-span-12 bg-white dark:bg-gray-800">
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
