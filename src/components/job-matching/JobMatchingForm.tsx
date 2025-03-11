
import { useState } from 'react';
import CVUploader from "@/components/upload/CVUploader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase, ArrowRight, PenTool, CheckCircle, AlertCircle, Lightbulb, Award, GraduationCap, BookOpen, ChevronRight, BarChart, ListCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { MatchResult } from "@/types/jobMatching";
import { Progress } from "@/components/ui/progress";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface JobMatchingFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
  matchResult: MatchResult | null;
}

const JobMatchingForm = ({ onAnalyze, isAnalyzing, matchResult }: JobMatchingFormProps) => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showUploader, setShowUploader] = useState(true);

  const handleCVUpload = (text: string) => {
    setCvText(text);
    if (text) {
      setShowUploader(false);
    }
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleAnalyzeClick = () => {
    if (!cvText || !jobDescription) return;
    onAnalyze(cvText, jobDescription);
  };

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

  const getSectionData = (matchResult: MatchResult) => {
    if (!matchResult) return [];
    
    return [
      { name: 'Skills', value: matchResult.sectionScores.skills, fill: getBarColor(matchResult.sectionScores.skills) },
      { name: 'Experience', value: matchResult.sectionScores.experience, fill: getBarColor(matchResult.sectionScores.experience) },
      { name: 'Education', value: matchResult.sectionScores.education, fill: getBarColor(matchResult.sectionScores.education) },
      { name: 'Certifications', value: matchResult.sectionScores.certifications, fill: getBarColor(matchResult.sectionScores.certifications) },
    ];
  };

  const getBarColor = (score: number) => {
    if (score >= 80) return "#22c55e"; // green-500
    if (score >= 60) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side: Job Description and CV container - 50% width */}
      <div>
        <Card className="glass-card border-dashed border animate-fade-in h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase size={20} />
              <span>Job Application Details</span>
            </CardTitle>
            <CardDescription>
              Enter job details and your CV to analyze match
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Job Description Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Briefcase size={16} />
                <span>Job Description</span>
              </h3>
              <Textarea
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Paste job description here..."
                className="min-h-[180px] resize-none"
              />
            </div>

            {/* CV Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <FileText size={16} />
                <span>Your CV</span>
              </h3>
              {showUploader ? (
                <CVUploader onUpload={handleCVUpload} />
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">CV Uploaded</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowUploader(true)}
                      className="isolate hover:bg-[#46235C] hover:text-white h-7 text-xs px-3"
                    >
                      Change
                    </Button>
                  </div>
                  <div className="bg-secondary/50 p-4 rounded-md h-[160px] overflow-auto">
                    <p className="text-sm whitespace-pre-wrap">{cvText}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Analyze Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleAnalyzeClick}
                disabled={!cvText || !jobDescription || isAnalyzing}
                className="rounded-full bg-[#46235C] hover:bg-[#46235C]/90 text-white isolate"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze CV'}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side: AI analysis preview section - 50% width */}
      <div>
        <Card className="glass-card border-dashed animate-fade-in h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool size={20} />
              <span>AI Analysis Preview</span>
            </CardTitle>
            <CardDescription>
              AI-generated job matching analysis will appear here
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[650px] overflow-y-auto">
            {!matchResult ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="p-6 rounded-lg bg-secondary/10 max-w-sm mx-auto">
                  <p className="text-muted-foreground">
                    Upload your CV and paste a job description, then click 'Analyze CV' to get AI-powered insights and suggestions.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                {/* Overall Match Score */}
                <div className="pb-6 border-b">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Award size={18} />
                    <span>Overall Match Score</span>
                    <span className={`text-xl font-bold ${getScoreColor(matchResult.score)}`}>
                      {matchResult.score}%
                    </span>
                  </h3>
                  <Progress value={matchResult.score} className={getProgressColor(matchResult.score)} />
                </div>
                
                {/* Section-wise Matching Breakdown */}
                <div className="pb-6 border-b">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <BarChart size={18} />
                    <span>Section-wise Breakdown</span>
                  </h3>
                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={getSectionData(matchResult)}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                      >
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" width={80} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Skills Analysis */}
                <div className="grid grid-cols-1 gap-4 pb-6 border-b">
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
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
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-500" />
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
                
                {/* Experience Alignment */}
                <div className="pb-6 border-b">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Briefcase size={16} className="text-blue-500" />
                    <span>Experience Alignment</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium">Matching Experience</h4>
                      <ul className="space-y-1">
                        {matchResult.experienceAlignment.matchingExperiences.map((exp, index) => (
                          <li key={index} className="flex gap-2 items-center text-xs">
                            <CheckCircle size={12} className="text-green-500 shrink-0" />
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xs font-medium">Experience Gaps</h4>
                      <ul className="space-y-1">
                        {matchResult.experienceAlignment.experienceGaps.map((gap, index) => (
                          <li key={index} className="flex gap-2 items-center text-xs">
                            <AlertCircle size={12} className="text-amber-500 shrink-0" />
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Keyword Analysis */}
                <div className="pb-6 border-b">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <ListCheck size={16} className="text-indigo-500" />
                    <span>Keyword Analysis</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-medium mb-2">Present Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {matchResult.keywordAnalysis.present.map((keyword, index) => (
                          <span key={index} className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded-full text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-medium mb-2">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {matchResult.keywordAnalysis.missing.map((keyword, index) => (
                          <span key={index} className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Soft Skills */}
                <div className="pb-6 border-b">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <GraduationCap size={16} className="text-teal-500" />
                    <span>Soft Skills Analysis</span>
                  </h3>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="text-xs font-medium mb-2">Required Soft Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {matchResult.softSkills.required.map((skill, index) => (
                          <span key={index} className="px-2.5 py-1 bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <h4 className="text-xs font-medium mb-2">Missing Soft Skills</h4>
                      <ul className="space-y-1">
                        {matchResult.softSkills.missing.map((skill, index) => (
                          <li key={index} className="flex gap-2 items-center text-xs">
                            <AlertCircle size={12} className="text-amber-500 shrink-0" />
                            <span>{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Actionable Summary */}
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Lightbulb size={16} className="text-amber-500" />
                    <span>Action Plan</span>
                  </h3>
                  <ul className="space-y-2">
                    {matchResult.actionableSummary.map((action, index) => (
                      <li key={index} className="flex gap-2 items-start p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10">
                        <ChevronRight size={14} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs">{action}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatchingForm;
