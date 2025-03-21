
import React from 'react';
import { FileText } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const CVAnalysisLoading = () => {
  return (
    <div className="text-center py-10 animate-pulse">
      <FileText size={48} className="mx-auto mb-6 text-gray-700" />
      <h3 className="text-xl font-medium mb-3">Analyzing Your CV</h3>
      <p className="text-muted-foreground mb-6">
        Our AI is evaluating your CV for structure, content, and ATS compatibility...
      </p>
      <Progress value={45} className="max-w-md mx-auto" />
    </div>
  );
};

export default CVAnalysisLoading;
