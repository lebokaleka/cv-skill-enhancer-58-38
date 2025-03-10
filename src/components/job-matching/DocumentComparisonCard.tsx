
import { MatchResult } from "@/types/jobMatching";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DocumentComparisonCardProps {
  matchResult: MatchResult;
}

const DocumentComparisonCard = ({ matchResult }: DocumentComparisonCardProps) => {
  return (
    <Card className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: '150ms' }}>
      <CardHeader className="border-b bg-secondary/40">
        <CardTitle>Document Comparison</CardTitle>
        <CardDescription>
          Side-by-side comparison with highlighted keywords
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="sideBySide">
          <TabsList className="mb-6 rounded-full">
            <TabsTrigger value="sideBySide" className="rounded-full">Side by Side</TabsTrigger>
            <TabsTrigger value="job" className="rounded-full">Job Description</TabsTrigger>
            <TabsTrigger value="cv" className="rounded-full">Your CV</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sideBySide" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Job Description</h3>
                <div className="bg-secondary/50 p-4 rounded-md max-h-64 overflow-auto">
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: matchResult.highlightedJob }}></p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Your CV</h3>
                <div className="bg-secondary/50 p-4 rounded-md max-h-64 overflow-auto">
                  <p className="text-sm" dangerouslySetInnerHTML={{ __html: matchResult.highlightedCV }}></p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="job" className="mt-0">
            <div className="bg-secondary/50 p-4 rounded-md max-h-96 overflow-auto">
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: matchResult.highlightedJob }}></p>
            </div>
          </TabsContent>
          
          <TabsContent value="cv" className="mt-0">
            <div className="bg-secondary/50 p-4 rounded-md max-h-96 overflow-auto">
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: matchResult.highlightedCV }}></p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DocumentComparisonCard;
