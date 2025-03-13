
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface KeySkillsFieldProps {
  control: Control<any>;
}

const KeySkillsField = ({ control }: KeySkillsFieldProps) => {
  return (
    <FormField 
      control={control} 
      name="keySkills" 
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-sm font-medium">Key Skills</FormLabel>
          <FormControl>
            <Input 
              placeholder="e.g. JavaScript, React, Node.js" 
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

export default KeySkillsField;
