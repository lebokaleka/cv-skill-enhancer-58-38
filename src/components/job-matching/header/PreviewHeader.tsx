
import { PenTool, Mic } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PreviewHeaderProps {
  showInterviewPreview: boolean;
  toggleInterviewPreview: () => void;
}

const PreviewHeader = ({ showInterviewPreview, toggleInterviewPreview }: PreviewHeaderProps) => {
  return (
    <>
      <CardTitle className="flex items-center gap-2">
        {!showInterviewPreview ? (
          <>
            <PenTool size={20} />
            <span>AI Analysis Preview</span>
          </>
        ) : (
          <>
            <Mic size={20} />
            <span>AI Interview Coach</span>
          </>
        )}
      </CardTitle>
      <CardDescription>
        {!showInterviewPreview 
          ? "AI-generated job matching analysis will appear here"
          : "Practice interview questions and get real-time feedback"}
      </CardDescription>
      <div className="flex justify-end mt-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleInterviewPreview} 
          className="text-xs text-primary hover:bg-primary/10"
        >
          {!showInterviewPreview ? "Try Interview Coach" : "Back to Analysis"}
        </Button>
      </div>
    </>
  );
};

export default PreviewHeader;
