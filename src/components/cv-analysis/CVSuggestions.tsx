import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, AlertTriangle, FileText, Lightbulb, LayoutPanelTop, MessageSquareText, Search, Briefcase, Type, Target, CheckCircle2, ThumbsUp, Info } from 'lucide-react';

// Update the interface to handle more structured suggestions
interface Suggestion {
  text: string;
  category: 'formatting' | 'content' | 'ats' | 'skills' | 'grammar' | 'customization';
  priority: 'critical' | 'recommended' | 'nice';
  example?: string;
}
interface SuggestionProps {
  suggestions: {
    high: string[];
    medium: string[];
    low: string[];
  };
  // This would be the new expected data structure
  structuredSuggestions?: Suggestion[];
  overallScore?: number;
}

// Map category to icon and colors
const categoryConfig = {
  formatting: {
    icon: <LayoutPanelTop size={18} className="text-indigo-500 shrink-0 mt-0.5" />,
    label: 'Formatting & Readability',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/10'
  },
  content: {
    icon: <MessageSquareText size={18} className="text-emerald-500 shrink-0 mt-0.5" />,
    label: 'Content & Clarity',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/10'
  },
  ats: {
    icon: <Search size={18} className="text-cyan-500 shrink-0 mt-0.5" />,
    label: 'ATS Optimization',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/10'
  },
  skills: {
    icon: <Briefcase size={18} className="text-violet-500 shrink-0 mt-0.5" />,
    label: 'Skills & Experience',
    bgColor: 'bg-violet-50 dark:bg-violet-900/10'
  },
  grammar: {
    icon: <Type size={18} className="text-pink-500 shrink-0 mt-0.5" />,
    label: 'Grammar & Language',
    bgColor: 'bg-pink-50 dark:bg-pink-900/10'
  },
  customization: {
    icon: <Target size={18} className="text-orange-500 shrink-0 mt-0.5" />,
    label: 'Customization for Job Role',
    bgColor: 'bg-orange-50 dark:bg-orange-900/10'
  }
};

// Map priority to icon and colors
const priorityConfig = {
  critical: {
    icon: <AlertCircle size={14} />,
    label: 'Critical',
    badgeColor: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
  },
  recommended: {
    icon: <ThumbsUp size={14} />,
    label: 'Recommended',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300'
  },
  nice: {
    icon: <Info size={14} />,
    label: 'Nice to Have',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
  }
};
const CVSuggestions = ({
  suggestions,
  structuredSuggestions,
  overallScore
}: SuggestionProps) => {
  // Mock structured suggestions if not provided
  const mockStructuredSuggestions: Suggestion[] = structuredSuggestions || [{
    text: "Add more quantifiable achievements to demonstrate impact",
    category: "content",
    priority: "critical"
  }, {
    text: "Include relevant industry keywords throughout your CV",
    category: "ats",
    priority: "critical",
    example: "Add keywords like 'data analysis', 'project management', and 'stakeholder communication'"
  }, {
    text: "Reduce the length of your professional summary",
    category: "formatting",
    priority: "recommended"
  }, {
    text: "Use more action verbs at the beginning of your bullet points",
    category: "grammar",
    priority: "recommended",
    example: "Instead of 'Was responsible for managing...' use 'Managed...'"
  }, {
    text: "Consider using a more modern format",
    category: "formatting",
    priority: "nice"
  }, {
    text: "Add a skills section for better ATS compatibility",
    category: "ats",
    priority: "recommended"
  }, {
    text: "Highlight leadership experience more prominently",
    category: "skills",
    priority: "recommended"
  }, {
    text: "Tailor your CV to better match the job description",
    category: "customization",
    priority: "critical"
  }];

  // Group suggestions by category
  const categorizedSuggestions = mockStructuredSuggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {} as Record<string, Suggestion[]>);

  // Group suggestions by priority
  const prioritizedSuggestions = mockStructuredSuggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.priority]) {
      acc[suggestion.priority] = [];
    }
    acc[suggestion.priority].push(suggestion);
    return acc;
  }, {} as Record<string, Suggestion[]>);
  return <div className="px-6 pb-6">
      <Card className="overflow-hidden animate-fade-in bg-white dark:bg-gray-800">
        <CardHeader className="border-b bg-white">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-500" />
            Improvement Suggestions
          </CardTitle>
          <CardDescription>
            Actionable recommendations to improve your CV
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="byPriority">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="byPriority" className="flex-1">
                By Priority
              </TabsTrigger>
              <TabsTrigger value="byCategory" className="flex-1">
                By Category
              </TabsTrigger>
            </TabsList>
            
            {/* View By Priority */}
            <TabsContent value="byPriority" className="mt-0 space-y-6">
              {['critical', 'recommended', 'nice'].map(priority => <div key={priority} className="space-y-4">
                  <div className="flex items-center gap-2">
                    {priorityConfig[priority as keyof typeof priorityConfig].icon}
                    <h3 className="font-semibold text-lg">
                      {priorityConfig[priority as keyof typeof priorityConfig].label} Issues
                    </h3>
                  </div>
                  
                  <ul className="space-y-4">
                    {prioritizedSuggestions[priority]?.map((suggestion, index) => <li key={index} className={`flex flex-col gap-2 p-4 rounded-lg ${categoryConfig[suggestion.category].bgColor}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3 items-start">
                            {categoryConfig[suggestion.category].icon}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className={priorityConfig[suggestion.priority].badgeColor}>
                                  {categoryConfig[suggestion.category].label}
                                </Badge>
                              </div>
                              <p className="font-medium">{suggestion.text}</p>
                              {suggestion.example && <div className="mt-2 ml-2 pl-2 border-l-2 border-gray-300 text-sm text-muted-foreground">
                                  <span className="font-medium">Example:</span> {suggestion.example}
                                </div>}
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="shrink-0">
                            <CheckCircle2 size={14} className="mr-1" />
                            Apply
                          </Button>
                        </div>
                      </li>)}
                  </ul>
                </div>)}
            </TabsContent>
            
            {/* View By Category */}
            <TabsContent value="byCategory" className="mt-0">
              <Accordion type="single" collapsible className="w-full">
                {Object.keys(categoryConfig).map(category => <AccordionItem key={category} value={category}>
                    <AccordionTrigger className="py-4">
                      <div className="flex items-center gap-2">
                        {categoryConfig[category as keyof typeof categoryConfig].icon}
                        <span>{categoryConfig[category as keyof typeof categoryConfig].label}</span>
                        {categorizedSuggestions[category]?.some(s => s.priority === 'critical') && <Badge className="ml-2 bg-red-500">Critical</Badge>}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-4 pt-2">
                        {categorizedSuggestions[category]?.map((suggestion, index) => <li key={index} className={`flex flex-col gap-2 p-4 rounded-lg ${categoryConfig[suggestion.category].bgColor}`}>
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className={priorityConfig[suggestion.priority].badgeColor}>
                                    {priorityConfig[suggestion.priority].label}
                                  </Badge>
                                </div>
                                <p className="font-medium">{suggestion.text}</p>
                                {suggestion.example && <div className="mt-2 ml-2 pl-2 border-l-2 border-gray-300 text-sm text-muted-foreground">
                                    <span className="font-medium">Example:</span> {suggestion.example}
                                  </div>}
                              </div>
                              <Button variant="outline" size="sm" className="shrink-0">
                                <CheckCircle2 size={14} className="mr-1" />
                                Apply
                              </Button>
                            </div>
                          </li>)}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>)}
              </Accordion>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
};
export default CVSuggestions;