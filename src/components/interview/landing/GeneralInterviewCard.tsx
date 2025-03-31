
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
      className={`relative overflow-hidden border-2 transition-all ${
        isActive ? 'border-primary shadow-lg' : 'border-dashed border-gray-200 hover:border-gray-300'
      }`} 
      onClick={onSelectTab}
    >
      {isActive && (
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-r-[50px] border-t-transparent border-r-primary/20"></div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-primary/10 p-2 rounded-full">
            <BrainCircuit className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-2xl">General Interview</CardTitle>
        </div>
        <CardDescription className="text-base">
          Practice common interview questions that apply to most job positions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8 pt-4">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500">Difficulty level</h3>
          
          <RadioGroup 
            value={difficulty || ""} 
            onValueChange={value => onSetDifficulty(value)} 
            className="grid grid-cols-3 gap-3"
          >
            <div>
              <RadioGroupItem 
                value="basic" 
                id="basic" 
                className="peer sr-only" 
              />
              <Label 
                htmlFor="basic" 
                className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary cursor-pointer ${
                  difficulty === 'basic' ? 'border-primary bg-primary/10' : ''
                }`}
              >
                <span className="text-sm font-medium">Basic</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem 
                value="intermediate" 
                id="intermediate" 
                className="peer sr-only" 
              />
              <Label 
                htmlFor="intermediate" 
                className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary cursor-pointer ${
                  difficulty === 'intermediate' ? 'border-primary bg-primary/10' : ''
                }`}
              >
                <span className="text-sm font-medium">Intermediate</span>
              </Label>
            </div>
            
            <div>
              <RadioGroupItem 
                value="advanced" 
                id="advanced" 
                className="peer sr-only" 
              />
              <Label 
                htmlFor="advanced" 
                className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 [&:has([data-state=checked])]:border-primary cursor-pointer ${
                  difficulty === 'advanced' ? 'border-primary bg-primary/10' : ''
                }`}
              >
                <span className="text-sm font-medium">Advanced</span>
              </Label>
            </div>
          </RadioGroup>
          
          {showError && (
            <Alert variant="destructive" className="py-2 mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please select a difficulty level
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-6">
        <Button 
          className="w-full" 
          onClick={(e) => {
            e.stopPropagation();
            onStartInterview();
          }}
        >
          Start General Interview
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneralInterviewCard;
