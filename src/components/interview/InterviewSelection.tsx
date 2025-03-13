
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

interface InterviewSelectionProps {
  interviewType: 'general' | 'narrowed' | null;
  difficulty: string;
  questionCount: number;
  onSetDifficulty: (difficulty: string) => void;
  onSetQuestionCount: (count: number) => void;
  onStartInterview: () => void;
  onBack: () => void;
}

interface JobSpecificFormData {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  positionLevel: string;
  keySkills: string;
}

const InterviewSelection = ({ 
  interviewType, 
  difficulty, 
  questionCount, 
  onSetDifficulty, 
  onSetQuestionCount, 
  onStartInterview, 
  onBack 
}: InterviewSelectionProps) => {
  const form = useForm<JobSpecificFormData>();

  if (interviewType === 'general') {
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
  } else if (interviewType === 'narrowed') {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <Button variant="outline" size="sm" className="mb-6" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <h2 className="mb-4">Job-Specific Interview</h2>
        <p className="text-muted-foreground mb-8">
          Provide details about the job you're interviewing for to get tailored questions.
        </p>
        
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-4">
                <FormField 
                  control={form.control} 
                  name="jobTitle" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} 
                />
                
                <FormField 
                  control={form.control} 
                  name="companyName" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Tech Solutions Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} 
                />
                
                <FormField 
                  control={form.control} 
                  name="jobDescription" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste the job description here..." 
                          className="min-h-32" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} 
                />
                
                <FormField 
                  control={form.control} 
                  name="positionLevel" 
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select position level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                          <SelectItem value="manager">Management</SelectItem>
                          <SelectItem value="executive">Executive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} 
                />
                
                <FormField 
                  control={form.control} 
                  name="keySkills" 
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} 
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={onStartInterview}>
              Generate Interview
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return null;
};

export default InterviewSelection;
