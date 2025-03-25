
import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { coverLetterTemplates } from "@/components/cover-letter/coverLetterTemplates";
import CoverLetterInput from "@/components/cover-letter/CoverLetterInput";
import CoverLetterPreview from "@/components/cover-letter/CoverLetterPreview";
import CoverLetterLayout from "@/components/cover-letter/CoverLetterLayout";
import CoverLetterStateProvider, { CoverLetterState } from "@/components/cover-letter/CoverLetterStateProvider";

const CoverLetter = () => {
  const { isAuthenticated, setIsAuthModalOpen, setIsSubscriptionModalOpen } = useAuth();

  const renderContent = (state: CoverLetterState): ReactNode => {
    return (
      <div className="space-y-8">
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
          onHTMLUpload={state.handleHTMLUpload}
        />
        
        {state.coverLetter && (
          <CoverLetterPreview 
            coverLetter={state.coverLetter} 
            selectedTemplate={state.selectedTemplate} 
            templates={coverLetterTemplates} 
            isGenerating={state.isGenerating} 
            customHTML={state.customHTML}
            onRegenerate={state.handleRegenerate} 
            onBack={() => state.setStep('input')} 
          />
        )}
      </div>
    );
  };

  return (
    <CoverLetterLayout>
      <CoverLetterStateProvider 
        isAuthenticated={isAuthenticated} 
        setIsAuthModalOpen={setIsAuthModalOpen}
        setIsSubscriptionModalOpen={setIsSubscriptionModalOpen}
      >
        {renderContent}
      </CoverLetterStateProvider>
    </CoverLetterLayout>
  );
};

export default CoverLetter;
