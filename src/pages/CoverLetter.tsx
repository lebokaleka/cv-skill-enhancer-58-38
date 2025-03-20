
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
    if (state.step === 'input') {
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
      <CoverLetterPreview 
        coverLetter={state.coverLetter} 
        selectedTemplate={state.selectedTemplate} 
        templates={coverLetterTemplates} 
        isGenerating={state.isGenerating} 
        onRegenerate={state.handleRegenerate} 
        onBack={() => state.setStep('input')} 
      />
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

export default CoverLetter;
