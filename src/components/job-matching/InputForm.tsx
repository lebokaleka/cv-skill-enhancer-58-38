
import { useState } from 'react';
import { CardContent } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import JobDescriptionInput from './components/JobDescriptionInput';
import ErrorNotification from './components/ErrorNotification';
import CVSection from './components/CVSection';

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
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [dialogKey, setDialogKey] = useState(0); // For forcing dialog remount

  const handleCVUpload = (text: string, name?: string) => {
    setCvText(text);
    if (name) {
      setFileName(name);
    }
    setShowUploader(false);
    setError(null);
  };

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
    setError(null);
  };

  const handleAnalyzeClick = () => {
    // First, increment the dialog key to force a remount regardless of current state
    setDialogKey(prevKey => prevKey + 1);
    
    // Close any existing dialog
    setShowErrorDialog(false);
    
    // Then check for errors and show the dialog if needed
    // Use requestAnimationFrame to ensure DOM updates before showing new dialog
    requestAnimationFrame(() => {
      // Check for missing data and set appropriate error message
      if (!cvText && !jobDescription) {
        setError("Please upload your CV and add a job description.");
        setShowErrorDialog(true);
        return;
      } else if (!cvText) {
        setError("Please upload your CV.");
        setShowErrorDialog(true);
        return;
      } else if (!jobDescription) {
        setError("Please add a job description.");
        setShowErrorDialog(true);
        return;
      }
      
      // Only proceed if both are available
      onAnalyze(cvText, jobDescription);
    });
  };

  return (
    <CardContent className="space-y-6">
      {/* Job Description Section */}
      <JobDescriptionInput 
        value={jobDescription} 
        onChange={handleJobDescriptionChange} 
      />

      {/* CV Section */}
      <CVSection onUpload={handleCVUpload} />

      {/* Error notification popup */}
      <ErrorNotification 
        isOpen={showErrorDialog}
        error={error}
        onOpenChange={setShowErrorDialog}
        dialogKey={dialogKey}
      />

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
