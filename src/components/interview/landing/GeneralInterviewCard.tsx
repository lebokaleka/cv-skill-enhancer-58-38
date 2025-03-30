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
  return <Card className={`glass-card border-dashed border hover:shadow-md transition-shadow cursor-pointer ${isActive ? 'ring-2 ring-primary' : ''} flex flex-col`} onClick={onSelectTab}>
      <CardHeader className="text-center mx-[144px] my-[130px] py-0 rounded-sm px-[24px]">
        <CardTitle className="text-xl flex justify-center items-center gap-2">
          <BrainCircuit size={22} />
          <span>General Interview</span>
        </CardTitle>
        <CardDescription className="text-base">
          Practice common interview questions that apply to most job positions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col items-center">
        <div className="space-y-4 w-full max-w-md">
          <div className="w-full">
            <RadioGroup value={difficulty || ""} onValueChange={value => onSetDifficulty(value)} className="flex justify-center gap-4">
              <div className="flex flex-col items-center space-y-1">
                <RadioGroupItem value="basic" id="basic" />
                <Label htmlFor="basic" className="font-normal">Basic</Label>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate" className="font-normal">Intermediate</Label>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced" className="font-normal">Advanced</Label>
              </div>
            </RadioGroup>
          </div>
          
          {showError && <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please select a difficulty level
              </AlertDescription>
            </Alert>}
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex justify-center">
        <Button className="rounded-full" onClick={onStartInterview}>
          Start General Interview
        </Button>
      </CardFooter>
    </Card>;
};
export default GeneralInterviewCard;