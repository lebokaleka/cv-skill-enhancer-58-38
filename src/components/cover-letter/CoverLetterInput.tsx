
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase } from 'lucide-react';
import CVUploader from "@/components/upload/CVUploader";
import TemplateSelector from "./TemplateSelector";
import { CoverLetterTemplate } from "./coverLetterTemplates";

interface CoverLetterInputProps {
  cvText: string;
  jobDescription: string;
  selectedTemplate: string;
  templates: CoverLetterTemplate[];
  isGenerating: boolean;
  onCVUpload: (text: string) => void;
  onJobDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onTemplateSelect: (template: string) => void;
  onGenerate: () => void;
}

const CoverLetterInput = ({
  cvText,
  jobDescription,
  selectedTemplate,
  templates,
  isGenerating,
  onCVUpload,
  onJobDescriptionChange,
  onTemplateSelect,
  onGenerate
}: CoverLetterInputProps) => {
  return <div className="space-y-8 animate-scale-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CV Upload Section */}
        <Card className="glass-card border-dashed h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} />
              <span>Your CV</span>
            </CardTitle>
            <CardDescription>
              Upload or paste your CV
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CVUploader onUpload={onCVUpload} />
          </CardContent>
        </Card>

        {/* Job Description Section */}
        <Card className="glass-card border-dashed h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase size={20} />
              <span>Job Description</span>
            </CardTitle>
            <CardDescription>
              Paste the job description you want to apply for
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-[calc(100%-81px)] my-[-21px] py-[21px]"> {/* Adjusted to fill remaining height */}
            <Textarea value={jobDescription} onChange={onJobDescriptionChange} placeholder="Paste job description here..." className="flex-grow min-h-[200px] resize-none" />
          </CardContent>
        </Card>
      </div>

      {/* Template Selection */}
      <TemplateSelector templates={templates} selectedTemplate={selectedTemplate} onSelectTemplate={onTemplateSelect} />

      {/* Generate Button */}
      <div className="flex justify-end">
        <Button size="lg" className="px-8" onClick={onGenerate}>
          {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
        </Button>
      </div>
    </div>;
};

export default CoverLetterInput;
