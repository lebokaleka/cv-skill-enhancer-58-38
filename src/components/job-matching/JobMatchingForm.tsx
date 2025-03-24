import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Briefcase, FileText, Mic, BrainCircuit, Target } from 'lucide-react';
import { MatchResult } from "@/types/jobMatching";
import InputForm from './InputForm';
import AnalysisResults from './AnalysisResults';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ContentIndicator from './ContentIndicator';

interface JobMatchingFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
  matchResult: MatchResult | null;
}

const JobMatchingForm = ({ onAnalyze, isAnalyzing, matchResult }: JobMatchingFormProps) => {
  const [showInterviewPreview, setShowInterviewPreview] = useState(false);
  const [isInterviewOptionsOpen, setIsInterviewOptionsOpen] = useState(false);
  const [showContentIndicator, setShowContentIndicator] = useState(true);
  const [expandContent, setExpandContent] = useState(false);

  useEffect(() => {
    console.log('JobMatchingForm mounted');
    
    return () => {
      console.log('JobMatchingForm unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('matchResult updated:', matchResult ? 'has value' : 'null');
    if (matchResult) {
      setExpandContent(false);
      setShowContentIndicator(true);
    }
  }, [matchResult]);

  const toggleInterviewPreview = () => {
    console.log('Toggling interview preview');
    setShowInterviewPreview(!showInterviewPreview);
    if (showInterviewPreview) {
      setIsInterviewOptionsOpen(false);
      setExpandContent(false);
      setShowContentIndicator(true);
    }
  };

  const handleExpandContent = () => {
    setExpandContent(true);
    setShowContentIndicator(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          <InputForm onAnalyze={onAnalyze} isAnalyzing={isAnalyzing} />
        </Card>
      </div>

      <div>
        <Card className="glass-card border-dashed animate-fade-in h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {!showInterviewPreview ? (
                <>
                  <PenTool size={20} />
                  <span>AI Analysis Preview</span>
                </>
              ) : (
                <>
                  <Mic size={20} />
                  <span>AI Interview Coach</span>
                </>
              )}
            </CardTitle>
            <CardDescription>
              {!showInterviewPreview 
                ? "AI-generated job matching analysis will appear here"
                : "Practice interview questions and get real-time feedback"}
            </CardDescription>
            <div className="flex justify-end mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleInterviewPreview} 
                className="text-xs text-primary hover:bg-primary/10"
              >
                {!showInterviewPreview ? "Try Interview Coach" : "Back to Analysis"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col relative">
            <div className={`relative ${expandContent ? 'h-auto' : 'h-[450px] overflow-hidden'}`}>
              {!showInterviewPreview ? (
                !matchResult ? (
                  <div className="flex flex-col items-center justify-center h-[450px] text-center">
                    <div className="p-6 rounded-lg bg-secondary/10 max-w-sm mx-auto">
                      <p className="text-muted-foreground">
                        Upload your CV and paste a job description, then click 'Analyze CV' to get AI-powered insights and suggestions.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <AnalysisResults matchResult={matchResult} />
                    {showContentIndicator && !expandContent && (
                      <ContentIndicator 
                        onClick={handleExpandContent} 
                      />
                    )}
                  </>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-[450px] animate-fade-in">
                  <div className="space-y-6 max-w-md w-full p-4">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2">Interview Practice</h3>
                      <p className="text-muted-foreground">Choose your interview mode to begin practicing</p>
                    </div>
                    
                    <Collapsible open={true} className="w-full">
                      <div className="grid grid-cols-1 gap-4">
                        <Card 
                          className="border border-primary/20 hover:border-primary/50 transition-all cursor-pointer hover:shadow-md"
                          onClick={() => {
                            console.log('General Interview Questions clicked');
                            setIsInterviewOptionsOpen(true);
                          }}
                        >
                          <CardContent className="p-6">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <span className="bg-primary/10 text-primary p-1 rounded-full">
                                <BrainCircuit size={16} />
                              </span>
                              General Interview Questions
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Practice with common interview questions across all industries
                            </p>
                          </CardContent>
                        </Card>
                        
                        <Card 
                          className="border border-primary/20 hover:border-primary/50 transition-all cursor-pointer hover:shadow-md"
                          onClick={() => {
                            console.log('Job-Specific Questions clicked');
                            setIsInterviewOptionsOpen(true);
                          }}
                        >
                          <CardContent className="p-6">
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <span className="bg-primary/10 text-primary p-1 rounded-full">
                                <Target size={16} />
                              </span>
                              Job-Specific Questions
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Get questions tailored to your specific job application
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </Collapsible>
                    
                    {isInterviewOptionsOpen && (
                      <div className="animate-fade-in mt-4">
                        <Card className="border border-primary/20">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">Interview Setup</CardTitle>
                            <CardDescription>Configure your practice session</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4 pb-6">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <h5 className="font-medium text-sm mb-2">Difficulty</h5>
                                <div className="flex flex-col gap-2">
                                  <Button variant="outline" size="sm" className="justify-start">
                                    Basic
                                  </Button>
                                  <Button variant="outline" size="sm" className="justify-start">
                                    Intermediate
                                  </Button>
                                  <Button variant="outline" size="sm" className="justify-start">
                                    Advanced
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <h5 className="font-medium text-sm mb-2">Questions</h5>
                                <div className="flex flex-col gap-2">
                                  <Button variant="outline" size="sm" className="justify-start">
                                    5 Questions
                                  </Button>
                                  <Button variant="outline" size="sm" className="justify-start">
                                    10 Questions
                                  </Button>
                                  <Button variant="outline" size="sm" className="justify-start">
                                    15 Questions
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <div className="flex justify-center mt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="rounded-full">Start Practicing</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Coming Soon!</DialogTitle>
                                <DialogDescription>
                                  The Interview Coach feature is still under development. Check back soon for this exciting new feature!
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end">
                                <Button variant="outline" className="rounded-full">Close</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    )}
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

export default JobMatchingForm;
