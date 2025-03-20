
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
    <Card className="md:col-span-12 bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <CardTitle>ATS Compatibility</CardTitle>
        </div>
        <CardDescription>
          How well your CV can be parsed by Applicant Tracking Systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            {atsCompatible ? (
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <h4 className="text-sm font-medium mb-1">
                {atsCompatible ? 'Your CV is ATS compatible' : 'Your CV may have ATS compatibility issues'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {atsCompatible 
                  ? 'Your CV format is properly structured for ATS systems. It should be correctly parsed by most applicant tracking systems.'
                  : 'Your CV format may cause issues with some ATS systems. Consider using a more standard format to ensure your information is properly parsed.'}
              </p>
            </div>
          </div>
          
          {missingKeywords.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-2">Suggested Keywords</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Consider including these keywords relevant to your industry:
              </p>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
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
