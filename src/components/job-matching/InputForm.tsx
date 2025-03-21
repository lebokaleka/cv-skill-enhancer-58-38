
import { useState, useEffect } from 'react';
import CVUploader from "@/components/upload/CVUploader";
import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getJobMatchingData, setJobMatchingData } from '@/utils/localStorage';

interface InputFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
}

const InputForm = ({ onAnalyze, isAnalyzing }: InputFormProps) => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [showUploader, setShowUploader] = useState(true);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = getJobMatchingData();
    if (savedData) {
      if (savedData.jobDescription) {
        setJobDescription(savedData.jobDescription);
      }
      if (savedData.cvText) {
        setCvText(savedData.cvText);
        if (savedData.fileName) {
          setFileName(savedData.fileName);
          setShowUploader(false);
        }
      }
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    if (cvText || jobDescription) {
      const dataToSave = {
        cvText,
        jobDescription,
        fileName
      };
      setJobMatchingData(dataToSave);
    }
  }, [cvText, jobDescription, fileName]);

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
        {showUploader ? (
          <CVUploader onUpload={handleCVUpload} />
        ) : (
          <div className="mb-4">
            <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/10">
              <p className="text-sm font-medium flex items-center gap-2">
                <FileText size={16} className="text-green-600" />
                {fileName || "CV uploaded"}
              </p>
              <Button 
                variant="link" 
                className="text-xs p-0 h-auto mt-1" 
                onClick={() => setShowUploader(true)}
              >
                Change CV
              </Button>
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
