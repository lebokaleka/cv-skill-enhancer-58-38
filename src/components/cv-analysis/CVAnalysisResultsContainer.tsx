
import React from 'react';
import CVAnalysisResults from "@/components/cv-analysis/CVAnalysisResults";
import CVSuggestions from "@/components/cv-analysis/CVSuggestions";
import type { CVScoreData } from "@/types/cvAnalysis";

interface CVAnalysisResultsContainerProps {
  scoreData: CVScoreData;
  fileName: string;
  onClearSession: () => void;
}

const CVAnalysisResultsContainer = ({ 
  scoreData, 
  fileName, 
  onClearSession 
}: CVAnalysisResultsContainerProps) => {
  return (
    <div id="cv-analysis-results" className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">CV Analysis Results</h2>
        <button 
          onClick={onClearSession}
          className="text-sm text-gray-500 hover:text-gray-700 hover:underline"
        >
          Reset Analysis
        </button>
      </div>
      {/* Container card for the results section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden pb-6">
        <CVAnalysisResults scoreData={scoreData} fileName={fileName} />
        <CVSuggestions 
          suggestions={scoreData.suggestions} 
          structuredSuggestions={scoreData.structuredSuggestions}
          sectionScores={scoreData.sections}
          overallScore={scoreData.overallScore}
        />
      </div>
    </div>
  );
};

export default CVAnalysisResultsContainer;
