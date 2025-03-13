
import { useState } from 'react';
import { BrainCircuit, Upload, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface InterviewLandingProps {
  onSelectInterviewType: (type: 'general' | 'narrowed') => void;
}

const InterviewLanding = ({
  onSelectInterviewType
}: InterviewLandingProps) => {
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  const handleGeneralInterviewStart = () => {
    if (difficulty && questionCount) {
      // Both settings are selected, proceed with the interview
      onSelectInterviewType('general');
      setShowError(false);
    } else {
      // Show error message if settings are not complete
      setShowError(true);
    }
  };

  return <div>
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Interview Coach</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Practice your interview skills with our AI-powered Interview Coach. 
          Get feedback on your responses and improve your performance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-scale-in">
        <Card className="glass-card border-dashed border hover:shadow-md transition-shadow cursor-pointer my-[33px] mx-[56px] px-[9px] py-[7px] rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit size={20} />
              <span>General Interview</span>
            </CardTitle>
            <CardDescription>
              Practice common interview questions that apply to most job positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Difficulty Level</h3>
                <RadioGroup 
                  value={difficulty || ""} 
                  onValueChange={(value) => setDifficulty(value)}
                  className="space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="basic" id="basic" />
                    <Label htmlFor="basic" className="font-normal">Basic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="font-normal">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced" className="font-normal">Advanced</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Number of Questions</h3>
                <RadioGroup 
                  value={questionCount?.toString() || ""} 
                  onValueChange={(value) => setQuestionCount(parseInt(value))}
                  className="space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="q5" />
                    <Label htmlFor="q5" className="font-normal">5 Questions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10" id="q10" />
                    <Label htmlFor="q10" className="font-normal">10 Questions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15" id="q15" />
                    <Label htmlFor="q15" className="font-normal">15 Questions</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {showError && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please select both difficulty level and number of questions
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full rounded-full" 
              onClick={handleGeneralInterviewStart}
            >
              Start General Interview
            </Button>
          </CardFooter>
        </Card>
        
        <Card onClick={() => onSelectInterviewType('narrowed')} className="glass-card border-dashed border hover:shadow-md transition-shadow cursor-pointer my-[33px] mx-[56px] px-[9px] py-[7px] rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              <span>Job-Specific Interview</span>
            </CardTitle>
            <CardDescription>
              Customize the interview based on a specific job position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Upload size={64} className="text-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-full">Select Job-Specific Interview</Button>
          </CardFooter>
        </Card>
      </div>
    </div>;
};

export default InterviewLanding;
