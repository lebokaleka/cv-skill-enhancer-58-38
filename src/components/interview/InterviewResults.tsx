
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
  const getAverageScore = () => {
    const scoresArray = messages
      .filter(msg => msg.sentiment)
      .map(msg => msg.sentiment ? msg.sentiment.overall : 0);
    
    return scoresArray.length 
      ? Math.floor(scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length) 
      : 0;
  };

  const averageScore = getAverageScore();
  
  // Generate overall assessment based on average score
  const getOverallAssessment = (score: number) => {
    if (score >= 85) {
      return "Excellent performance! You demonstrate strong interviewing skills.";
    } else if (score >= 70) {
      return "Good performance. With some refinement, you'll excel in interviews.";
    } else if (score >= 50) {
      return "Satisfactory performance. Focus on the improvement areas to enhance your interview skills.";
    } else {
      return "You have significant room for improvement. Regular practice will help you develop stronger interviewing skills.";
    }
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
          <div className="flex justify-center items-center mb-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">
                {averageScore}%
              </div>
              <div className="text-sm text-muted-foreground mt-1">Overall Score</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <p className="text-center text-base">
              {getOverallAssessment(averageScore)}
            </p>
            
            <h4 className="font-semibold pt-4">Key Areas for Development</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Practice using the STAR method to structure your answers.</li>
              <li>Work on including specific metrics and results in your examples.</li>
              <li>Prepare concise, focused answers for common interview questions.</li>
              <li>Record yourself and listen for filler words and pacing.</li>
              <li>Practice relating your experiences directly to the job requirements.</li>
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
                        {aiMsg.sentiment.overall}% Score
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
