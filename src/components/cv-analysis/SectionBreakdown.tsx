
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BarChart, LayoutPanelTop, MessageSquareText, Search, Briefcase, Type } from 'lucide-react';
import type { CVScoreData } from "@/types/cvAnalysis";
import SectionProgressBar from "./SectionProgressBar";

interface SectionBreakdownProps {
  sections: CVScoreData['sections'];
}

const SectionBreakdown = ({ sections }: SectionBreakdownProps) => {
  return (
    <Card className="md:col-span-8 bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart size={20} className="text-primary" />
          Section Breakdown
        </CardTitle>
        <CardDescription>Detailed score by section</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <SectionProgressBar 
            icon={<LayoutPanelTop size={18} className="text-primary" />}
            label="Formatting & Readability"
            score={sections.formattingReadability}
          />
          
          <SectionProgressBar 
            icon={<MessageSquareText size={18} className="text-primary" />}
            label="Content & Clarity"
            score={sections.contentClarity}
          />
          
          <SectionProgressBar 
            icon={<Search size={18} className="text-primary" />}
            label="ATS Optimization"
            score={sections.atsOptimization}
          />
          
          <SectionProgressBar 
            icon={<Briefcase size={18} className="text-primary" />}
            label="Skills & Experience"
            score={sections.skillsExperience}
          />
          
          <SectionProgressBar 
            icon={<Type size={18} className="text-primary" />}
            label="Grammar & Language"
            score={sections.grammarLanguage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SectionBreakdown;
