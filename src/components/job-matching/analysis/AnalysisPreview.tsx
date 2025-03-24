
import { MatchResult } from "@/types/jobMatching";
import AnalysisResults from '../AnalysisResults';
import ContentIndicator from '../ContentIndicator';

interface AnalysisPreviewProps {
  matchResult: MatchResult | null;
  showContentIndicator: boolean;
  expandContent: boolean;
  onExpandContent: () => void;
}

const AnalysisPreview = ({ 
  matchResult, 
  showContentIndicator, 
  expandContent, 
  onExpandContent 
}: AnalysisPreviewProps) => {
  if (!matchResult) {
    return (
      <div className="flex flex-col items-center justify-center h-[450px] text-center">
        <div className="p-6 rounded-lg bg-secondary/10 max-w-sm mx-auto">
          <p className="text-muted-foreground">
            Upload your CV and paste a job description, then click 'Analyze CV' to get AI-powered insights and suggestions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className={expandContent ? "pb-4" : "h-[450px] overflow-hidden"}>
        <AnalysisResults matchResult={matchResult} />
      </div>
      {showContentIndicator && (
        <ContentIndicator 
          onClick={onExpandContent} 
          isExpanded={expandContent} 
          className={expandContent ? "" : "absolute bottom-0 left-0 right-0"}
        />
      )}
    </div>
  );
};

export default AnalysisPreview;
