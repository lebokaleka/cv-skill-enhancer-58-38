
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface CompanyNameFieldProps {
  control: Control<any>;
}

const CompanyNameField = ({ control }: CompanyNameFieldProps) => {
  return (
    <FormField 
      control={control} 
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
  );
};

export default CompanyNameField;
