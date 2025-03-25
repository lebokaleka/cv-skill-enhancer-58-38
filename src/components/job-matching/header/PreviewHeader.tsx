
import { PenTool, Mic } from 'lucide-react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface PreviewHeaderProps {
  showInterviewPreview: boolean;
  toggleInterviewPreview: () => void;
}

const PreviewHeader = ({ showInterviewPreview, toggleInterviewPreview }: PreviewHeaderProps) => {
  const navigate = useNavigate();
  
  const handleInterviewClick = () => {
    navigate('/interview');
  };
  
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
          onClick={handleInterviewClick} 
          className="text-xs text-primary hover:underline hover:font-semibold hover:text-primary/90 transition-all duration-200 ease-in-out"
        >
          Try Interview Coach
        </Button>
      </div>
    </>
  );
};

export default PreviewHeader;
