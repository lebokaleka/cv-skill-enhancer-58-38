
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';
import type { Suggestion } from "@/types/cvAnalysis";
import { useNavigate } from 'react-router-dom';

interface SuggestionItemProps {
  suggestion: Suggestion;
  categoryBgColor: string;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ suggestion, categoryBgColor }) => {
  const navigate = useNavigate();
  
  const priorityConfig = {
    critical: {
      label: 'Critical',
      badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    },
    recommended: {
      label: 'Recommended',
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
    },
    nice: {
      label: 'Nice to Have',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    }
  };

  const handleApplySuggestion = () => {
    navigate('/job-matching');
  };

  return (
    <li className={`flex flex-col gap-2 p-4 rounded-lg ${categoryBgColor}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className={priorityConfig[suggestion.priority].badgeColor}>
              {priorityConfig[suggestion.priority].label}
            </Badge>
          </div>
          <p className="font-medium">{suggestion.text}</p>
          {suggestion.example && (
            <div className="mt-2 ml-2 pl-2 border-l-2 border-gray-300 text-sm text-muted-foreground">
              <span className="font-medium">Example:</span> {suggestion.example}
            </div>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="shrink-0"
          onClick={handleApplySuggestion}
        >
          <CheckCircle2 size={14} className="mr-1" />
          Apply
        </Button>
      </div>
    </li>
  );
};

export default SuggestionItem;
