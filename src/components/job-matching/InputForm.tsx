
import { useState } from 'react';
import CVUploader from "@/components/upload/CVUploader";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase, ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InputFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
}

const InputForm = ({ onAnalyze, isAnalyzing }: InputFormProps) => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [showUploader, setShowUploader] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCVUpload = (text: string, name?: string) => {
    setCvText(text);
    if (name) {
      setFileName(name);
    }
    setShowUploader(false);
    setError(null);
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    setError(null);
  };

  const handleAnalyzeClick = () => {
    // Clear any existing error
    setError(null);
    
    // Check for missing data and set appropriate error message
    if (!cvText && !jobDescription) {
      setError("Please upload your CV and add a job description.");
      return;
    } else if (!cvText) {
      setError("Please upload your CV.");
      return;
    } else if (!jobDescription) {
      setError("Please add a job description.");
      return;
    }
    
    // Only proceed if both are available
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

      {/* Error message */}
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Analyze Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleAnalyzeClick}
          disabled={isAnalyzing}
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
