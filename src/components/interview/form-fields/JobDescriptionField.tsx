
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface JobDescriptionFieldProps {
  control: Control<any>;
}

const JobDescriptionField = ({ control }: JobDescriptionFieldProps) => {
  return (
    <FormField 
      control={control} 
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
  );
};

export default JobDescriptionField;
