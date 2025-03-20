
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, BrainCircuit } from 'lucide-react';
import Keywords from './Keywords';
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
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit size={20} className="text-primary" />
            ATS Compatibility
          </CardTitle>
          <CardDescription>
            Automated Tracking System compatibility analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            atsCompatible 
              ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300" 
              : "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
          }`}>
            {atsCompatible ? (
              <CheckCircle className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
            )}
            <div>
              <h4 className="text-sm font-medium mb-1">
                {atsCompatible 
                  ? "Your CV is ATS compatible" 
                  : "Your CV needs ATS optimization"}
              </h4>
              <p className="text-xs">
                {atsCompatible 
                  ? "Your CV is well-structured for Applicant Tracking Systems and should pass through automated filters." 
                  : "Your CV may be filtered out by Applicant Tracking Systems. Consider adding the missing keywords below."}
              </p>
            </div>
          </div>
          
          {missingKeywords.length > 0 && (
            <Keywords 
              keywords={missingKeywords} 
              title="Missing Keywords" 
              description="Important keywords that were not found in your CV"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ATSCompatibility;
