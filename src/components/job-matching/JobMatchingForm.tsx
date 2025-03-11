
import { useState } from 'react';
import CVUploader from "@/components/upload/CVUploader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase, ArrowRight, PenTool } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface JobMatchingFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
}

const JobMatchingForm = ({ onAnalyze, isAnalyzing }: JobMatchingFormProps) => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left side: CV upload and Job Description in a single column */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="glass-card border-dashed animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} />
              <span>Your CV</span>
            </CardTitle>
            <CardDescription>
              Upload your CV
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {showUploader ? (
              <CVUploader onUpload={handleCVUpload} />
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">CV Uploaded</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowUploader(true)}
                    className="isolate hover:bg-[#46235C] hover:text-white"
                  >
                    Change
                  </Button>
                </div>
                <div className="bg-secondary/50 p-4 rounded-md h-[180px] overflow-auto">
                  <p className="text-sm whitespace-pre-wrap">{cvText}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card border-dashed animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase size={20} />
              <span>Job Description</span>
            </CardTitle>
            <CardDescription>
              Paste the job description you want to apply for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Paste job description here..."
                className="min-h-[220px] resize-none"
              />
              
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
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side: AI analysis preview section */}
      <div className="lg:col-span-1">
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
          <CardContent className="flex flex-col items-center justify-center h-[450px] text-center">
            <div className="p-6 rounded-lg bg-secondary/10 max-w-sm mx-auto">
              <p className="text-muted-foreground">
                Upload your CV and paste a job description, then click 'Analyze CV' to get AI-powered insights and suggestions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatchingForm;
