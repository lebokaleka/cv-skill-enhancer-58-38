
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface PositionLevelFieldProps {
  control: Control<any>;
}

const PositionLevelField = ({ control }: PositionLevelFieldProps) => {
  return (
    <FormField 
      control={control} 
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
            <SelectContent className="bg-background text-foreground">
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
  );
};

export default PositionLevelField;
