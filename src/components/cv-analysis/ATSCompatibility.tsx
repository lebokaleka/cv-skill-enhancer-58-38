
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, BrainCircuit } from 'lucide-react';
import type { CVScoreData } from "@/types/cvAnalysis";

interface ATSCompatibilityProps {
  atsCompatible: boolean;
  missingKeywords: string[];
}

const ATSCompatibility = ({
  atsCompatible,
  missingKeywords
}: ATSCompatibilityProps) => {
  return (
    <Card className="col-span-1 md:col-span-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          ATS Compatibility
        </CardTitle>
        <CardDescription>
          Applicant Tracking Systems (ATS) scan your CV before human reviewers. Ensure your CV passes these systems.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`p-4 rounded-md ${atsCompatible ? 'bg-green-50 dark:bg-green-950/20' : 'bg-amber-50 dark:bg-amber-950/20'}`}>
            <div className="flex items-start">
              {atsCompatible ? (
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
              )}
              <div>
                <h4 className={`font-medium ${atsCompatible ? 'text-green-800 dark:text-green-300' : 'text-amber-800 dark:text-amber-300'}`}>
                  {atsCompatible ? 'Your CV is ATS compatible' : 'Your CV may have ATS compatibility issues'}
                </h4>
                <p className="text-sm mt-1 text-muted-foreground">
                  {atsCompatible 
                    ? 'Your CV is structured in a way that should be readable by most ATS systems.'
                    : 'Consider addressing the issues below to improve your CV\'s compatibility with ATS systems.'}
                </p>
              </div>
            </div>
          </div>

          {missingKeywords.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Consider adding these keywords:</h4>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ATSCompatibility;
