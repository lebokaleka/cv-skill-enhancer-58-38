
import { Button } from "@/components/ui/button";

interface ResultActionsProps {
  onNewComparison: () => void;
}

const ResultActions = ({ onNewComparison }: ResultActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end animate-fade-in" style={{ animationDelay: '450ms' }}>
      <Button 
        variant="outline" 
        onClick={onNewComparison}
        className="rounded-full"
      >
        New Comparison
      </Button>
      <Button 
        onClick={() => window.location.href = '/cover-letter'}
        className="rounded-full"
      >
        Generate Cover Letter
      </Button>
    </div>
  );
};

export default ResultActions;
