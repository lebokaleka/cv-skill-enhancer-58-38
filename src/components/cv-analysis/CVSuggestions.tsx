
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, AlertTriangle, FileText, Lightbulb } from 'lucide-react';

interface SuggestionProps {
  suggestions: {
    high: string[];
    medium: string[];
    low: string[];
  };
}

const CVSuggestions = ({ suggestions }: SuggestionProps) => {
  return (
    <div className="px-6 pb-6">
      <Card className="glass-card overflow-hidden animate-fade-in">
        <CardHeader className="border-b bg-secondary/40">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-500" />
            Improvement Suggestions
          </CardTitle>
          <CardDescription>
            Actionable recommendations to improve your CV
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="high">
            <TabsList className="mb-6">
              <TabsTrigger value="high" className="gap-2">
                <AlertCircle size={14} className="text-red-500" />
                High Priority
              </TabsTrigger>
              <TabsTrigger value="medium" className="gap-2">
                <AlertTriangle size={14} className="text-amber-500" />
                Medium Priority
              </TabsTrigger>
              <TabsTrigger value="low" className="gap-2">
                <FileText size={14} className="text-blue-500" />
                Low Priority
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="high" className="mt-0">
              <ul className="space-y-4">
                {suggestions.high.map((suggestion, index) => (
                  <li key={index} className="flex gap-3 items-start p-3 rounded-lg bg-red-50 dark:bg-red-900/10">
                    <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                    <p>{suggestion}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="medium" className="mt-0">
              <ul className="space-y-4">
                {suggestions.medium.map((suggestion, index) => (
                  <li key={index} className="flex gap-3 items-start p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10">
                    <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <p>{suggestion}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="low" className="mt-0">
              <ul className="space-y-4">
                {suggestions.low.map((suggestion, index) => (
                  <li key={index} className="flex gap-3 items-start p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                    <FileText size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    <p>{suggestion}</p>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CVSuggestions;
