import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CVUploadSection from "@/components/cv-analysis/CVUploadSection";
import CVAnalysisLoading from "@/components/cv-analysis/CVAnalysisLoading";
import CVAnalysisResultsContainer from "@/components/cv-analysis/CVAnalysisResultsContainer";
import { useCVAnalysis } from "@/hooks/useCVAnalysis";

const CVAnalysis = () => {
  const {
    cvText,
    fileName,
    isAnalyzing,
    scoreData,
    handleCVUpload,
    handleClearSession
  } = useCVAnalysis();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {/* Wrap the upload section in the animate-scale-in div */}
          <div className="animate-scale-in">
            <CVUploadSection 
              onAnalyze={handleCVUpload} 
              isAnalyzing={isAnalyzing} 
              savedCvText={cvText}
              savedFileName={fileName}
            />
          </div>

          {/* Loading indicator */}
          {isAnalyzing && <CVAnalysisLoading />}

          {/* Results section - only shown after analysis */}
          {scoreData && !isAnalyzing && (
            <CVAnalysisResultsContainer 
              scoreData={scoreData} 
              fileName={fileName} 
              onClearSession={handleClearSession} 
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CVAnalysis;
