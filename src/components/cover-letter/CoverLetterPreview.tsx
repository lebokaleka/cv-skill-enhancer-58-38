import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Copy, Check, RefreshCw } from 'lucide-react';
import { CoverLetterTemplate } from "./coverLetterTemplates";
import ModernProfessionalTemplate from './templates/ModernProfessionalTemplate';
import TechProfessionalTemplate from './templates/TechProfessionalTemplate';
import ClassicProfessionalTemplate from './templates/ClassicProfessionalTemplate';
import ModernMinimalistTemplate from './templates/ModernMinimalistTemplate';
import CreativeAccentTemplate from './templates/CreativeAccentTemplate';
import ExecutiveElegantTemplate from './templates/ExecutiveElegantTemplate';
import ProfessionalCornerTemplate from './templates/ProfessionalCornerTemplate';
import ProfessionalBurgundyTemplate from './templates/ProfessionalBurgundyTemplate';

interface CoverLetterPreviewProps {
  coverLetter: string;
  selectedTemplate: string;
  templates: CoverLetterTemplate[];
  isGenerating: boolean;
  onRegenerate: () => void;
  onBack: () => void;
}

const CoverLetterPreview = ({
  coverLetter,
  selectedTemplate,
  templates,
  isGenerating,
  onRegenerate,
  onBack
}: CoverLetterPreviewProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic-professional':
        return <ClassicProfessionalTemplate content={coverLetter} />;
      case 'tech-professional':
        return <TechProfessionalTemplate content={coverLetter} />;
      case 'modern-professional':
        return <ModernProfessionalTemplate content={coverLetter} />;
      case 'modern-minimalist':
        return <ModernMinimalistTemplate content={coverLetter} />;
      case 'creative-accent':
        return <CreativeAccentTemplate content={coverLetter} />;
      case 'executive-elegant':
        return <ExecutiveElegantTemplate content={coverLetter} />;
      case 'professional-corner':
        return <ProfessionalCornerTemplate content={coverLetter} />;
      case 'professional-burgundy':
        return <ProfessionalBurgundyTemplate content={coverLetter} />;
      default:
        return <div className="bg-white border border-gray-200 border-dashed rounded-xl shadow-sm">
            <pre className="font-sans whitespace-pre-wrap text-foreground">
              {coverLetter}
            </pre>
          </div>;
    }
  };

  return <div className="space-y-8 animate-fade-in-up">
      {/* Cover Letter Preview */}
      <Card className="bg-white border border-gray-200 border-dashed rounded-xl shadow-sm">
        <CardHeader className="border-b border-dashed bg-gray-50/30 rounded-t-xl py-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div>
              <CardTitle>Your Cover Letter</CardTitle>
              <CardDescription className="mt-1">
                {templates.find(t => t.id === selectedTemplate)?.name} template
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={handleCopy}>
                {copied ? <>
                    <Check size={14} />
                    <span>Copied</span>
                  </> : <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>}
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={onRegenerate} disabled={isGenerating}>
                <RefreshCw size={14} className={isGenerating ? 'animate-spin' : ''} />
                <span>Regenerate</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download size={14} />
                <span>Download</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {renderTemplate()}
        </CardContent>
      </Card>
    </div>;
};

export default CoverLetterPreview;
