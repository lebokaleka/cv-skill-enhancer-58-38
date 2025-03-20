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
  return;
};
export default ATSCompatibility;