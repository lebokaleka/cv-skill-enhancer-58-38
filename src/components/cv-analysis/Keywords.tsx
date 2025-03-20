
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tags } from 'lucide-react';

interface KeywordsProps {
  keywords: string[];
  title?: string;
  description?: string;
}

const Keywords = ({ 
  keywords, 
  title = "Missing Keywords", 
  description = "Keywords that were not found in your CV" 
}: KeywordsProps) => {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Tags size={18} className="text-amber-500" />
          {title}
        </CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span 
              key={index} 
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
            >
              {keyword}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Keywords;
