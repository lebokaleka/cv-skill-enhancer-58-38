
import { useState } from 'react';
import { BrainCircuit, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface GeneralInterviewCardProps {
  isActive: boolean;
  difficulty: string | null;
  questionCount: number | null;
  showError: boolean;
  onSelectTab: () => void;
  onSetDifficulty: (difficulty: string) => void;
  onSetQuestionCount: (count: number) => void;
  onStartInterview: () => void;
}

const GeneralInterviewCard = ({
  isActive,
  difficulty,
  questionCount,
  showError,
  onSelectTab,
  onSetDifficulty,
  onSetQuestionCount,
  onStartInterview
}: GeneralInterviewCardProps) => {
  return (
    <Card 
      className={`glass-card border-dashed border hover:shadow-md transition-shadow cursor-pointer ${isActive ? 'ring-2 ring-primary' : ''} flex flex-col`}
      onClick={onSelectTab}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit size={20} />
          <span>General Interview</span>
        </CardTitle>
        <CardDescription>
          Practice common interview questions that apply to most job positions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Difficulty Level</h3>
            <RadioGroup 
              value={difficulty || ""} 
              onValueChange={(value) => onSetDifficulty(value)}
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
              onValueChange={(value) => onSetQuestionCount(parseInt(value))}
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
      <CardFooter className="mt-auto">
        <Button 
          className="w-full rounded-full" 
          onClick={onStartInterview}
        >
          Start General Interview
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneralInterviewCard;
