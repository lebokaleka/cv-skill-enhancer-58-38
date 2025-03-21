
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isAnalyzing: boolean;
}

const AnalyzeButton = ({ onClick, disabled, isAnalyzing }: AnalyzeButtonProps) => {
  return (
    <div className="flex justify-end">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="rounded-full bg-[#46235C] hover:bg-[#46235C]/90 text-white isolate"
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze CV'}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default AnalyzeButton;
