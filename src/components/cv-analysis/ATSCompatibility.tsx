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
  return <div className="col-span-1 md:col-span-12">
      
    </div>;
};
export default ATSCompatibility;