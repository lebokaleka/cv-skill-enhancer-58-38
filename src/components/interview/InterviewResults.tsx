
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SentimentScore {
  confidence: number;
  clarity: number;
  relevance: number;
  overall: number;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  sentiment?: SentimentScore;
}

interface InterviewResultsProps {
  messages: Message[];
  questions: string[];
  onStartNewInterview: () => void;
}

const InterviewResults = ({ messages, questions, onStartNewInterview }: InterviewResultsProps) => {
  const getAverageScore = (scoreType: keyof SentimentScore) => {
    const scoresArray = messages
      .filter(msg => msg.sentiment)
      .map(msg => msg.sentiment ? msg.sentiment[scoreType] : 0);
    
    return scoresArray.length 
      ? Math.floor(scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length) 
      : 0;
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Button variant="outline" size="sm" className="mb-6" onClick={onStartNewInterview}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Start New Interview
      </Button>
      
      <h2 className="mb-4">Interview Results</h2>
      <p className="text-muted-foreground mb-8">
        Review your performance and get insights on areas to improve.
      </p>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">
                {getAverageScore('confidence')}%
              </div>
              <div className="text-sm text-muted-foreground">Confidence</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">
                {getAverageScore('clarity')}%
              </div>
              <div className="text-sm text-muted-foreground">Clarity</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">
                {getAverageScore('relevance')}%
              </div>
              <div className="text-sm text-muted-foreground">Relevance</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold">
                {getAverageScore('overall')}%
              </div>
              <div className="text-sm text-muted-foreground">Overall</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Key Strengths</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>You provided specific examples in your answers.</li>
              <li>Your responses were generally well-structured.</li>
              <li>You maintained good energy throughout the interview.</li>
            </ul>
            
            <h4 className="font-semibold pt-4">Areas for Improvement</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Try to be more concise in some of your longer answers.</li>
              <li>Practice eliminating filler words ("um", "like", "you know").</li>
              <li>Work on connecting your experiences more clearly to the job requirements.</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" /> Save Results
          </Button>
          <Button onClick={onStartNewInterview}>
            Practice Again
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Question Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {questions.map((question, index) => {
              const userMsg = messages.find(
                (msg, i) => msg.role === 'user' && messages[i - 1]?.content === question
              );
              
              const aiMsg = userMsg ? messages.find(
                (msg, i) => msg.role === 'ai' && i > messages.indexOf(userMsg) && msg.sentiment
              ) : null;
              
              return (
                <div key={index} className="pb-4 border-b last:border-b-0">
                  <h5 className="font-medium mb-2">{index + 1}. {question}</h5>
                  {aiMsg?.sentiment && (
                    <div className="flex space-x-2 mt-2">
                      <Badge 
                        variant="outline" 
                        className={`${
                          aiMsg.sentiment.overall > 75 
                            ? 'border-green-500 text-green-700' 
                            : 'border-orange-500 text-orange-700'
                        }`}
                      >
                        {aiMsg.sentiment.overall}% Overall
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewResults;
