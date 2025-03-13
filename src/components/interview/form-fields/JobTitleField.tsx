
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface JobTitleFieldProps {
  control: Control<any>;
}

const JobTitleField = ({ control }: JobTitleFieldProps) => {
  return (
    <FormField 
      control={control} 
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
  );
};

export default JobTitleField;
