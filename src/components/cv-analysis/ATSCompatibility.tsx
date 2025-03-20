
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
    <Card className="shadow-sm border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-blue-500" />
            ATS Compatibility Check
          </CardTitle>
          {atsCompatible ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <AlertCircle className="h-6 w-6 text-red-500" />
          )}
        </div>
        <CardDescription>
          {atsCompatible 
            ? "Your CV is compatible with most ATS systems."
            : "Your CV may be rejected by some Applicant Tracking Systems (ATS)."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {missingKeywords.length > 0 && (
          <div className="mt-2">
            <h4 className="text-sm font-medium mb-2">Consider adding these keywords:</h4>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs">
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
