
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertCircle, BrainCircuit } from 'lucide-react';
import type { CVScoreData } from "@/types/cvAnalysis";

interface ATSCompatibilityProps {
  atsCompatible: boolean;
  missingKeywords: string[];
}

const ATSCompatibility = ({ atsCompatible, missingKeywords }: ATSCompatibilityProps) => {
  return (
    <Card className="md:col-span-12 bg-white dark:bg-gray-800">
      <CardHeader className={`border-b ${atsCompatible ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}`}>
        <CardTitle className="flex items-center gap-2">
          {atsCompatible ? (
            <>
              <CheckCircle size={20} className="text-green-500" />
              <span>ATS Compatible</span>
            </>
          ) : (
            <>
              <AlertCircle size={20} className="text-red-500" />
              <span>ATS Issues Found</span>
            </>
          )}
        </CardTitle>
        <CardDescription>
          Applicant Tracking System Analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            {atsCompatible ? (
              <div className="flex gap-3 items-start p-4 rounded-lg bg-green-50 dark:bg-green-900/10">
                <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5" />
                <p className="text-sm">
                  Your CV is properly formatted for Applicant Tracking Systems. It will be parsed correctly by most HR software.
                </p>
              </div>
            ) : (
              <div className="flex gap-3 items-start p-4 rounded-lg bg-red-50 dark:bg-red-900/10">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm">
                  We've detected formatting issues that may cause problems with ATS systems. Check our suggestions tab for details.
                </p>
              </div>
            )}
          </div>

          {missingKeywords.length > 0 && (
            <div className="flex-1">
              <div className="flex gap-3 items-start p-4 rounded-lg bg-secondary/10">
                <BrainCircuit size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-2">Recommended keywords to add:</h4>
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-secondary/20 rounded-full text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ATSCompatibility;
