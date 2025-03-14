
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
        <FormItem>
          <FormLabel>Key Skills</FormLabel>
          <FormControl>
            <Input 
              placeholder="e.g. JavaScript, React, Node.js" 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
  );
};

export default KeySkillsField;
