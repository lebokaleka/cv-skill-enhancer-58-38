
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { ArrowLeft } from 'lucide-react';
import JobTitleField from "../form-fields/JobTitleField";
import CompanyNameField from "../form-fields/CompanyNameField";
import JobDescriptionField from "../form-fields/JobDescriptionField";
import PositionLevelField from "../form-fields/PositionLevelField";
import KeySkillsField from "../form-fields/KeySkillsField";

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
              <JobTitleField control={form.control} />
              <CompanyNameField control={form.control} />
              <JobDescriptionField control={form.control} />
              <PositionLevelField control={form.control} />
              <KeySkillsField control={form.control} />
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
