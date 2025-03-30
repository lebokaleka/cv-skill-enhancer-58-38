
import { useState } from 'react';
import { BrainCircuit, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
      <CardHeader className="text-center py-8 px-4 rounded-sm">
        <CardTitle className="text-3xl sm:text-4xl md:text-5xl flex flex-col items-center gap-3 mb-4">
          <BrainCircuit size={40} />
          <span>General Interview</span>
        </CardTitle>
        <CardDescription className="text-lg sm:text-xl md:text-2xl">
          Practice common interview questions that apply to most job positions
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8 flex-1 flex flex-col items-center">
        <div className="space-y-4 w-full max-w-md">
          <div className="w-full">
            <RadioGroup 
              value={difficulty || ""} 
              onValueChange={value => onSetDifficulty(value)} 
              className="flex justify-center gap-16"
            >
              <div className="flex flex-col items-center">
                <div 
                  className={`relative w-24 h-12 rounded-full flex items-center justify-center cursor-pointer border transition-all ${difficulty === 'basic' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300 hover:border-primary/50'}`} 
                  onClick={() => onSetDifficulty('basic')}
                >
                  <RadioGroupItem value="basic" id="basic" className="absolute opacity-0" />
                  <span className="text-sm font-medium">Basic</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div 
                  className={`relative w-24 h-12 rounded-full flex items-center justify-center cursor-pointer border transition-all ${difficulty === 'intermediate' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300 hover:border-primary/50'}`} 
                  onClick={() => onSetDifficulty('intermediate')}
                >
                  <RadioGroupItem value="intermediate" id="intermediate" className="absolute opacity-0" />
                  <span className="text-sm font-medium">Intermediate</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <div 
                  className={`relative w-24 h-12 rounded-full flex items-center justify-center cursor-pointer border transition-all ${difficulty === 'advanced' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300 hover:border-primary/50'}`} 
                  onClick={() => onSetDifficulty('advanced')}
                >
                  <RadioGroupItem value="advanced" id="advanced" className="absolute opacity-0" />
                  <span className="text-sm font-medium">Advanced</span>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          {showError && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please select a difficulty level
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="mt-auto flex justify-center pb-8">
        <Button className="rounded-full" onClick={onStartInterview}>
          Start General Interview
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GeneralInterviewCard;
