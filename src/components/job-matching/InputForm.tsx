
import { useState, useEffect } from 'react';
import { CardContent } from "@/components/ui/card";
import { useJobMatchingState } from '@/hooks/useJobMatchingState';
import JobDescriptionInput from './JobDescriptionInput';
import CVUploadSection from './CVUploadSection';
import AnalyzeButton from './AnalyzeButton';

interface InputFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
  initialCvText?: string;
  initialJobDescription?: string;
}

const InputForm = ({ 
  onAnalyze, 
  isAnalyzing, 
  initialCvText = '', 
  initialJobDescription = '' 
}: InputFormProps) => {
  const { 
    cvText, 
    setCvText, 
    jobDescription, 
    setJobDescription, 
    fileName, 
    setFileName 
  } = useJobMatchingState();
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
      <JobDescriptionInput 
        value={jobDescription} 
        onChange={handleJobDescriptionChange} 
      />

      {/* CV Section */}
      <CVUploadSection onUpload={handleCVUpload} />

      {/* Analyze Button */}
      <AnalyzeButton 
        onClick={handleAnalyzeClick}
        disabled={!cvText || !jobDescription || isAnalyzing}
        isAnalyzing={isAnalyzing}
      />
    </CardContent>
  );
};

export default InputForm;
