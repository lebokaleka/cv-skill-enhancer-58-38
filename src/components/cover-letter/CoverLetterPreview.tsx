
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Copy, Check, RefreshCw } from 'lucide-react';
import { CoverLetterTemplate } from "./coverLetterTemplates";
import ModernProfessionalTemplate from './templates/ModernProfessionalTemplate';

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
      case 'modern-professional':
        return <ModernProfessionalTemplate content={coverLetter} />;
      default:
        // Fallback to simple display for other templates
        return (
          <div className="bg-white dark:bg-background border rounded-md p-6 shadow-sm min-h-[60vh]">
            <pre className="font-sans whitespace-pre-wrap text-foreground">
              {coverLetter}
            </pre>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-scale-in">
      {/* Cover Letter Preview */}
      <Card className="glass-card">
        <CardHeader className="border-b bg-secondary/40">
          <div className="flex justify-between items-center">
            <CardTitle>Your Cover Letter</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={onRegenerate}
                disabled={isGenerating}
              >
                <RefreshCw size={14} className={isGenerating ? 'animate-spin' : ''} />
                <span>Regenerate</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
              >
                <Download size={14} />
                <span>Download</span>
              </Button>
            </div>
          </div>
          <CardDescription>
            {templates.find(t => t.id === selectedTemplate)?.name} template
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {renderTemplate()}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          Back to Editor
        </Button>
        <Button>
          Finalize Cover Letter
        </Button>
      </div>
    </div>
  );
};

export default CoverLetterPreview;
