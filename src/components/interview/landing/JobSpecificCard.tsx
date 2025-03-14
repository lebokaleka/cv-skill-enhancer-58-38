
import { Upload, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormProvider, UseFormReturn } from "react-hook-form";
import JobTitleField from '../form-fields/JobTitleField';
import CompanyNameField from '../form-fields/CompanyNameField';
import JobDescriptionField from '../form-fields/JobDescriptionField';
import PositionLevelField from '../form-fields/PositionLevelField';
import KeySkillsField from '../form-fields/KeySkillsField';

interface JobSpecificCardProps {
  isActive: boolean;
  showError: boolean;
  formMethods: UseFormReturn<any>;
  onSelectTab: () => void;
  onStartInterview: () => void;
}

const JobSpecificCard = ({
  isActive,
  showError,
  formMethods,
  onSelectTab,
  onStartInterview
}: JobSpecificCardProps) => {
  const { control } = formMethods;

  return (
    <Card 
      className={`glass-card border-dashed border hover:shadow-md transition-shadow cursor-pointer ${isActive ? 'ring-2 ring-primary' : ''} flex flex-col`}
      onClick={onSelectTab}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload size={20} />
          <span>Job-Specific Interview</span>
        </CardTitle>
        <CardDescription>
          Customize the interview based on a specific job position
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <FormProvider {...formMethods}>
          <form className="space-y-4">
            <JobTitleField control={control} />
            <CompanyNameField control={control} />
            <JobDescriptionField control={control} />
            <PositionLevelField control={control} />
            <KeySkillsField control={control} />

            {showError && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please complete all job details before starting the interview
                </AlertDescription>
              </Alert>
            )}
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button 
          className="w-full rounded-full"
          onClick={onStartInterview}
        >
          Start Job-Specific Interview
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobSpecificCard;
