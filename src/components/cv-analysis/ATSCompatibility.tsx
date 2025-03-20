
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
    <div className="col-span-1 md:col-span-12">
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-blue-500" />
            ATS Compatibility
          </CardTitle>
          <CardDescription>
            Applicant Tracking System compatibility assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            {atsCompatible ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-600 dark:text-green-400">
                  Your CV is ATS-compatible
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="font-medium text-red-600 dark:text-red-400">
                  Your CV needs ATS optimization
                </span>
              </>
            )}
          </div>
          
          {missingKeywords.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium mb-2">Consider adding these keywords:</p>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ATSCompatibility;
