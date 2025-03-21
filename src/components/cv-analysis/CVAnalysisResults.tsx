
import type { CVScoreData } from "@/types/cvAnalysis";
import OverallScoreCard from "./OverallScoreCard";
import SectionBreakdown from "./SectionBreakdown";

interface CVAnalysisResultsProps {
  scoreData: CVScoreData;
  fileName?: string;
}

const CVAnalysisResults = ({ scoreData, fileName }: CVAnalysisResultsProps) => {
  return (
    <div className="px-6 pt-6 animate-fade-in">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Overall Score Card */}
        <OverallScoreCard 
          score={scoreData.overallScore} 
          fileName={fileName} 
        />

        {/* Section Scores */}
        <SectionBreakdown 
          sections={scoreData.sections} 
        />
      </div>
    </div>
  );
};

export default CVAnalysisResults;
