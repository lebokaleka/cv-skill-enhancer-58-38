
import { useState } from 'react';
import CVUploader from "@/components/upload/CVUploader";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface InputFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
}

const InputForm = ({ onAnalyze, isAnalyzing }: InputFormProps) => {
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
  );
};

export default InputForm;
