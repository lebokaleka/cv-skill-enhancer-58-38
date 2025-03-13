
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuestionStrategyProps {
  currentQuestion: string;
}

const QuestionStrategy = ({ currentQuestion }: QuestionStrategyProps) => {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Current Question</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted rounded-lg mb-6">
          <p className="font-medium">{currentQuestion}</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-2">Question Strategy</h4>
            <p className="text-sm text-muted-foreground">
              This is a{' '}
              {currentQuestion?.toLowerCase().includes('tell me about') 
                ? 'behavioral' 
                : 'situational'} question.
              Focus on {currentQuestion?.toLowerCase().includes('tell me about') 
                ? 'providing specific examples' 
                : 'explaining your thought process'}.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Key Points to Address</h4>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Your specific experience or approach</li>
              <li>The skills you demonstrated</li>
              <li>The results you achieved</li>
              <li>What you learned from the experience</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionStrategy;
