
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface AnalysisCardHeaderProps {
  showInterviewPreview: boolean;
  title: ReactNode;
  interviewTitle: ReactNode;
  description: string;
  interviewDescription: string;
  onToggleView: () => void;
}

const AnalysisCardHeader = ({
  showInterviewPreview,
  title,
  interviewTitle,
  description,
  interviewDescription,
  onToggleView
}: AnalysisCardHeaderProps) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {!showInterviewPreview ? title : interviewTitle}
      </CardTitle>
      <CardDescription>
        {!showInterviewPreview ? description : interviewDescription}
      </CardDescription>
      <div className="flex justify-end mt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleView} 
          className="text-xs text-primary hover:bg-primary/10"
        >
          {!showInterviewPreview ? "Try Interview Coach" : "Back to Analysis"}
        </Button>
      </div>
    </CardHeader>
  );
};

export default AnalysisCardHeader;
