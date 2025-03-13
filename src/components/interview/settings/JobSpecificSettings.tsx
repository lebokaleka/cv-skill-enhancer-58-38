
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ArrowLeft } from 'lucide-react';

interface JobSpecificFormData {
  jobTitle: string;
  companyName: string;
  jobDescription: string;
  positionLevel: string;
  keySkills: string;
}

interface JobSpecificSettingsProps {
  onStartInterview: () => void;
  onBack: () => void;
}

const JobSpecificSettings = ({ onStartInterview, onBack }: JobSpecificSettingsProps) => {
  const form = useForm<JobSpecificFormData>();

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
};

export default JobSpecificSettings;
