
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
        <FormItem className="space-y-2">
          <FormLabel className="text-sm font-medium">Job Title</FormLabel>
          <FormControl>
            <Input 
              placeholder="e.g. Software Engineer" 
              className="bg-background rounded-md border-border focus:border-primary" 
              {...field} 
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )} 
    />
  );
};

export default JobTitleField;
