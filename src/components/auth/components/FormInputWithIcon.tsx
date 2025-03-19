
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { LucideIcon } from "lucide-react";

interface FormInputWithIconProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  icon: LucideIcon;
}

const FormInputWithIcon = ({ 
  control, 
  name, 
  label, 
  placeholder, 
  type = "text",
  icon: Icon
}: FormInputWithIconProps) => {
  return (
    <FormField 
      control={control} 
      name={name} 
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center border rounded-md focus-within:border-primary">
              <Icon className="ml-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type={type} 
                placeholder={placeholder} 
                className="border-0 focus-visible:ring-0" 
                {...field} 
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )} 
    />
  );
};

export default FormInputWithIcon;
