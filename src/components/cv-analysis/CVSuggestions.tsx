
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { Lightbulb, LayoutPanelTop, MessageSquareText, Search, Briefcase, Type, Target } from 'lucide-react';
import type { Suggestion, CVScoreData } from "@/types/cvAnalysis";
import CategoryItem from './CategoryItem';

interface SuggestionProps {
  suggestions: {
    high: string[];
    medium: string[];
    low: string[];
  };
  structuredSuggestions?: Suggestion[];
  sectionScores?: {
    formattingReadability: number;
    contentClarity: number;
    atsOptimization: number;
    skillsExperience: number;
    grammarLanguage: number;
  };
  overallScore?: number;
}

// Map category to icon and colors
const categoryConfig = {
  formatting: {
    icon: <LayoutPanelTop size={18} className="text-indigo-500 shrink-0 mt-0.5" />,
    label: 'Formatting & Readability',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/10',
    sectionKey: 'formattingReadability'
  },
  content: {
    icon: <MessageSquareText size={18} className="text-emerald-500 shrink-0 mt-0.5" />,
    label: 'Content & Clarity',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/10',
    sectionKey: 'contentClarity'
  },
  ats: {
    icon: <Search size={18} className="text-cyan-500 shrink-0 mt-0.5" />,
    label: 'ATS Optimization',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/10',
    sectionKey: 'atsOptimization'
  },
  skills: {
    icon: <Briefcase size={18} className="text-violet-500 shrink-0 mt-0.5" />,
    label: 'Skills & Experience',
    bgColor: 'bg-violet-50 dark:bg-violet-900/10',
    sectionKey: 'skillsExperience'
  },
  grammar: {
    icon: <Type size={18} className="text-pink-500 shrink-0 mt-0.5" />,
    label: 'Grammar & Language',
    bgColor: 'bg-pink-50 dark:bg-pink-900/10',
    sectionKey: 'grammarLanguage'
  },
  customization: {
    icon: <Target size={18} className="text-orange-500 shrink-0 mt-0.5" />,
    label: 'Customization for Job Role',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10'
  }
};

const CVSuggestions = ({ suggestions, structuredSuggestions, sectionScores, overallScore }: SuggestionProps) => {
  // Mock structured suggestions if not provided
  const mockStructuredSuggestions: Suggestion[] = structuredSuggestions || [
    {
      text: "Add more quantifiable achievements to demonstrate impact",
      category: "content",
      priority: "critical"
    }, 
    {
      text: "Include relevant industry keywords throughout your CV",
      category: "ats",
      priority: "critical",
      example: "Add keywords like 'data analysis', 'project management', and 'stakeholder communication'"
    }, 
    {
      text: "Reduce the length of your professional summary",
      category: "formatting",
      priority: "recommended"
    }, 
    {
      text: "Use more action verbs at the beginning of your bullet points",
      category: "grammar",
      priority: "recommended",
      example: "Instead of 'Was responsible for managing...' use 'Managed...'"
    }, 
    {
      text: "Consider using a more modern format",
      category: "formatting",
      priority: "nice"
    }, 
    {
      text: "Add a skills section for better ATS compatibility",
      category: "ats",
      priority: "recommended"
    }, 
    {
      text: "Highlight leadership experience more prominently",
      category: "skills",
      priority: "recommended"
    }, 
    {
      text: "Tailor your CV to better match the job description",
      category: "customization",
      priority: "critical"
    }
  ];

  // Group suggestions by category
  const categorizedSuggestions = mockStructuredSuggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {} as Record<string, Suggestion[]>);
  
  return (
    <div className="px-6 pb-6">
      <Card className="overflow-hidden animate-fade-in bg-white dark:bg-gray-800 my-[26px]">
        <CardHeader className="border-b bg-white">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-500" />
            Improvement Suggestions
          </CardTitle>
          <CardDescription>
            Actionable recommendations to improve your CV
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 bg-white">
          <Accordion type="single" collapsible className="w-full">
            {Object.keys(categoryConfig).map(category => {
              // Check if this category has a corresponding section score
              let isCritical = false;
              const configItem = categoryConfig[category as keyof typeof categoryConfig];
              
              if (sectionScores && 'sectionKey' in configItem) {
                const sectionKey = configItem.sectionKey as keyof typeof sectionScores;
                const score = sectionScores[sectionKey];
                // Mark as critical if score is below 30%
                isCritical = score < 30;
              }
              
              return (
                <CategoryItem
                  key={category}
                  category={category}
                  categoryConfig={categoryConfig[category as keyof typeof categoryConfig]}
                  suggestions={categorizedSuggestions[category] || []}
                  isCritical={isCritical}
                />
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVSuggestions;
