
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
    <Card className="md:col-span-6 bg-white dark:bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BrainCircuit size={18} className="text-blue-500" />
          ATS Compatibility
        </CardTitle>
        <CardDescription>
          Analysis of how well your CV aligns with applicant tracking systems
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          {atsCompatible ? (
            <>
              <CheckCircle className="text-green-500" size={20} />
              <span className="font-medium text-green-600">Your CV is ATS-friendly</span>
            </>
          ) : (
            <>
              <AlertCircle className="text-red-500" size={20} />
              <span className="font-medium text-red-600">Your CV needs ATS improvements</span>
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
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full"
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
