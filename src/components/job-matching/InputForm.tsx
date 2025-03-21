
import { useState, useEffect } from 'react';
import CVUploader from "@/components/upload/CVUploader";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useJobMatchingState } from '@/hooks/useJobMatchingState';

interface InputFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
  initialCvText?: string;
  initialJobDescription?: string;
}

const InputForm = ({ onAnalyze, isAnalyzing, initialCvText = '', initialJobDescription = '' }: InputFormProps) => {
  const { cvText, setCvText, jobDescription, setJobDescription, fileName, setFileName } = useJobMatchingState();
  const [showUploader, setShowUploader] = useState(true);

  // Initialize with saved values if available
  useEffect(() => {
    if (initialCvText) {
      setCvText(initialCvText);
      setShowUploader(false);
    }
    
    if (initialJobDescription) {
      setJobDescription(initialJobDescription);
    }
  }, [initialCvText, initialJobDescription]);

  const handleCVUpload = (text: string, name?: string) => {
    setCvText(text);
    if (name) {
      setFileName(name);
    }
    setShowUploader(false);
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
        
        {/* CV Uploader */}
        <CVUploader onUpload={handleCVUpload} />
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
