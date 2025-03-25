
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import UploadTab from './UploadTab';
import PasteTab from './PasteTab';

interface CVUploadSectionProps {
  onAnalyze: (cvText: string, fileName?: string) => void;
  isAnalyzing: boolean;
  savedCvText?: string;
  savedFileName?: string;
}

const CVUploadSection = ({ 
  onAnalyze, 
  isAnalyzing, 
  savedCvText = '', 
  savedFileName = '' 
}: CVUploadSectionProps) => {
  const [cvText, setCvText] = useState(savedCvText);
  const [fileName, setFileName] = useState(savedFileName);
  const [inputMethod, setInputMethod] = useState<'upload' | 'paste'>(
    savedCvText && !savedFileName ? 'paste' : 'upload'
  );

  // Update initial state if saved data is passed in
  useEffect(() => {
    if (savedCvText) {
      setCvText(savedCvText);
    }
    
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }, [savedCvText, savedFileName]);

  const handleTextChange = (value: string) => {
    setCvText(value);
  };

  const handleFileSelect = (text: string, name: string) => {
    setCvText(text);
    setFileName(name);
  };

  const handleCVUpload = () => {
    onAnalyze(cvText, fileName);
  };

  return (
    <div className="space-y-8">
      {/* Title and subtitle - Match the Cover Letter section's animation */}
      <div className="max-w-3xl mx-auto text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">CV Analysis & Optimization</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your CV to receive a score, ATS compatibility check, and actionable improvements.
        </p>
      </div>

      {/* Card with upload tabs - Match the Cover Letter section's animation */}
      <Card className="shadow-md border animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="pt-6 px-6">
          <Tabs defaultValue={inputMethod} className="w-full" onValueChange={(value) => setInputMethod(value as 'upload' | 'paste')}>
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6 rounded-full overflow-hidden">
              <TabsTrigger 
                value="upload" 
                className="data-[state=active]:bg-[#46235C] data-[state=active]:text-white data-[state=active]:isolate bg-gray-100 dark:bg-gray-800"
              >
                Upload File
              </TabsTrigger>
              <TabsTrigger 
                value="paste" 
                className="data-[state=active]:bg-[#46235C] data-[state=active]:text-white data-[state=active]:isolate bg-gray-100 dark:bg-gray-800"
              >
                Paste Text
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-0">
              <UploadTab 
                onFileSelect={handleFileSelect} 
                fileName={fileName} 
              />
            </TabsContent>
            
            <TabsContent value="paste" className="mt-0">
              <PasteTab 
                value={cvText} 
                onChange={handleTextChange} 
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end my-6">
            <Button
              className="rounded-full px-6 py-2 bg-[#46235C] hover:bg-[#46235C]/80 active:bg-[#46235C]/60 text-white isolate transition-all duration-200"
              onClick={handleCVUpload}
              disabled={isAnalyzing || ((inputMethod === 'paste' && cvText.trim() === '') || (inputMethod === 'upload' && !fileName))}
            >
              {fileName || (inputMethod === 'paste' && cvText.trim() !== '') ? 'Analyze CV' : 'Upload & Analyze'}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CVUploadSection;
