
import { Button } from "@/components/ui/button";

interface ResultActionsProps {
  onNewComparison: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const ResultActions = ({ onNewComparison, className, style }: ResultActionsProps) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-end ${className || ''}`} style={style}>
      <Button 
        variant="outline" 
        onClick={onNewComparison}
        className="rounded-full"
      >
        New Comparison
      </Button>
    </div>
  );
};

export default ResultActions;
