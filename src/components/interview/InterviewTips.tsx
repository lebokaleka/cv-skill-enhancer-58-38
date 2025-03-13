
import { ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InterviewTips = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start">
            <ThumbsUp className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
            <p className="text-sm">Speak clearly and maintain a steady pace.</p>
          </div>
          <div className="flex items-start">
            <ThumbsUp className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
            <p className="text-sm">
              Use the STAR method (Situation, Task, Action, Result) for behavioral questions.
            </p>
          </div>
          <div className="flex items-start">
            <ThumbsUp className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
            <p className="text-sm">Be specific with examples from your experience.</p>
          </div>
          <div className="flex items-start">
            <ThumbsUp className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
            <p className="text-sm">
              Keep your answers concise, typically 1-2 minutes per question.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewTips;
