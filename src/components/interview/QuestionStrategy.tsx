
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InterviewQuestion } from "@/types/interview";

interface QuestionStrategyProps {
  currentQuestion: InterviewQuestion;
}

const QuestionStrategy = ({ currentQuestion }: QuestionStrategyProps) => {
  if (!currentQuestion) {
    return null;
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Current Question</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-muted rounded-lg mb-6">
          <p className="font-medium">{currentQuestion.question}</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-2">Question Strategy</h4>
            <p className="text-sm text-muted-foreground">
              This is a <span className="font-medium">{currentQuestion.type}</span> question.
              Focus on addressing the key points below in your answer.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-2">Key Points to Address</h4>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              {currentQuestion.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionStrategy;
