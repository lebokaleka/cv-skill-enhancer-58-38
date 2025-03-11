
import { ListCheck } from 'lucide-react';
import { MatchResult } from "@/types/jobMatching";

interface KeywordAnalysisProps {
  keywordAnalysis: MatchResult['keywordAnalysis'];
}

const KeywordAnalysis = ({ keywordAnalysis }: KeywordAnalysisProps) => {
  return (
    <div className="pb-6 border-b">
      <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
        <ListCheck size={16} className="text-indigo-500" />
        <span>Keyword Analysis</span>
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-medium mb-2">Present Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {keywordAnalysis.present.map((keyword, index) => (
              <span key={index} className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 rounded-full text-xs">
                {keyword}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-medium mb-2">Missing Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {keywordAnalysis.missing.map((keyword, index) => (
              <span key={index} className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-xs">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordAnalysis;
