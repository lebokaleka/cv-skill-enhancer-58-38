
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { Suggestion } from "@/types/cvAnalysis";
import SuggestionItem from './SuggestionItem';

interface CategoryConfig {
  icon: React.ReactNode;
  label: string;
  bgColor: string;
}

interface CategoryItemProps {
  category: string;
  categoryConfig: CategoryConfig;
  suggestions: Suggestion[];
  isCritical?: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ 
  category, 
  categoryConfig, 
  suggestions,
  isCritical = false
}) => {
  // If isCritical flag is true, we show the Critical badge regardless of suggestion priorities
  // Otherwise, check if there are any critical priority suggestions
  const hasCriticalSuggestions = isCritical || suggestions?.some(s => s.priority === 'critical');

  return (
    <AccordionItem value={category}>
      <AccordionTrigger className="py-4">
        <div className="flex items-center gap-2">
          {categoryConfig.icon}
          <span className="text-sm">
            {categoryConfig.label}
          </span>
          {hasCriticalSuggestions && <Badge className="ml-2 bg-red-500">Critical</Badge>}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="space-y-4 pt-2">
          {suggestions?.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              suggestion={suggestion}
              categoryBgColor={categoryConfig.bgColor}
              category={category}
            />
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoryItem;
