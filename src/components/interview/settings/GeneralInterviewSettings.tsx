
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';

interface GeneralInterviewSettingsProps {
  difficulty: string;
  questionCount: number;
  onSetDifficulty: (difficulty: string) => void;
  onSetQuestionCount: (count: number) => void;
  onStartInterview: () => void;
  onBack: () => void;
}

const GeneralInterviewSettings = ({
  difficulty,
  questionCount,
  onSetDifficulty,
  onSetQuestionCount,
  onStartInterview,
  onBack
}: GeneralInterviewSettingsProps) => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <Button variant="outline" size="sm" className="mb-6" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      <h2 className="mb-4">General Interview Settings</h2>
      <p className="text-muted-foreground mb-8">
        Select the difficulty level and number of questions for your practice interview.
      </p>
      
      <Card>
        <CardHeader>
          <CardTitle>Configure Your Interview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Difficulty Level</Label>
            <RadioGroup 
              defaultValue="basic" 
              value={difficulty} 
              onValueChange={onSetDifficulty} 
              className="flex flex-col space-y-1"
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
          
          <div className="space-y-4">
            <Label>Number of Questions</Label>
            <RadioGroup 
              defaultValue="5" 
              value={questionCount.toString()} 
              onValueChange={value => onSetQuestionCount(parseInt(value))} 
              className="flex flex-col space-y-1"
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
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onStartInterview}>
            Start Interview
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GeneralInterviewSettings;
