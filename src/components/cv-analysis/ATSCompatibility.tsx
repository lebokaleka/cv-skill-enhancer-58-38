
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
    <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          <CardTitle className="text-lg">ATS Compatibility</CardTitle>
        </div>
        <CardDescription>
          Applicant Tracking System evaluation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          {atsCompatible ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="font-medium text-green-700 dark:text-green-400">Your CV is ATS-compatible</p>
            </>
          ) : (
            <>
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              <p className="font-medium text-amber-700 dark:text-amber-400">Your CV may not pass ATS filters</p>
            </>
          )}
        </div>
        
        {!atsCompatible && missingKeywords.length > 0 && (
          <div>
            <p className="text-sm mb-2 text-muted-foreground">Missing keywords that may be important:</p>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded text-xs"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ATSCompatibility;
