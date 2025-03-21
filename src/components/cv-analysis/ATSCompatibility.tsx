
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
      <Card className="overflow-hidden">
        <CardHeader className={`py-4 ${atsCompatible ? 'bg-green-50 dark:bg-green-900/10' : 'bg-amber-50 dark:bg-amber-900/10'}`}>
          <div className="flex items-center space-x-2">
            {atsCompatible ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            )}
            <CardTitle className="text-lg">ATS Compatibility</CardTitle>
          </div>
          <CardDescription>
            {atsCompatible 
              ? "Your CV is well-structured for Applicant Tracking Systems" 
              : "Your CV may need improvements to pass through ATS filters"}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <BrainCircuit className="h-5 w-5 text-indigo-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">
                  Consider adding these keywords to improve your ATS score:
                </h4>
                <Keywords keywords={missingKeywords} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ATSCompatibility;
