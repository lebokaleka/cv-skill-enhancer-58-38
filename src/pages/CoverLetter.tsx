
import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { coverLetterTemplates } from "@/components/cover-letter/coverLetterTemplates";
import CoverLetterInput from "@/components/cover-letter/CoverLetterInput";
import CoverLetterPreview from "@/components/cover-letter/CoverLetterPreview";
import CoverLetterLayout from "@/components/cover-letter/CoverLetterLayout";
import CoverLetterStateProvider, { CoverLetterState } from "@/components/cover-letter/CoverLetterStateProvider";

const CoverLetter = () => {
  const { isAuthenticated, setIsAuthModalOpen } = useAuth();

  const renderContent = (state: CoverLetterState): ReactNode => {
    if (state.step === 'input' || !state.coverLetter) {
      return (
        <CoverLetterInput 
          cvText={state.cvText} 
          jobDescription={state.jobDescription} 
          selectedTemplate={state.selectedTemplate} 
          templates={coverLetterTemplates.slice(0, 5)} 
          isGenerating={state.isGenerating} 
          onCVUpload={state.handleCVUpload} 
          onJobDescriptionChange={state.handleJobDescriptionChange} 
          onTemplateSelect={state.handleTemplateSelect} 
          onGenerate={state.handleGenerate} 
        />
      );
    }
    
    return (
      <div className="space-y-8">
        <CoverLetterPreview 
          coverLetter={state.coverLetter} 
          selectedTemplate={state.selectedTemplate} 
          templates={coverLetterTemplates} 
          isGenerating={state.isGenerating} 
          onRegenerate={state.handleRegenerate} 
          onBack={() => state.setStep('input')} 
        />
        
        <div className="flex justify-start">
          <Button 
            variant="outline" 
            onClick={() => state.setStep('input')}
            className="gap-2"
          >
            <ArrowLeft size={16} />
            <span>Back to Editor</span>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <CoverLetterLayout>
      <CoverLetterStateProvider 
        isAuthenticated={isAuthenticated} 
        setIsAuthModalOpen={setIsAuthModalOpen}
      >
        {renderContent}
      </CoverLetterStateProvider>
    </CoverLetterLayout>
  );
};

// Need to import these components
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default CoverLetter;
