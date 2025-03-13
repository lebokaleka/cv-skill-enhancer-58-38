
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoverLetterTemplate } from "./coverLetterTemplates";
import { Check } from "lucide-react";
import Image from "@/components/ui/image";

interface TemplateSelectorProps {
  templates: CoverLetterTemplate[];
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

const TemplateSelector = ({ 
  templates, 
  selectedTemplate, 
  onSelectTemplate 
}: TemplateSelectorProps) => {
  // We'll only show the first 5 templates in a single row
  const displayTemplates = templates.slice(0, 5);
  
  return (
    <Card className="glass-card border-dashed">
      <CardHeader className="py-4">
        <CardTitle>Choose a Template</CardTitle>
        <CardDescription>
          Select a template that matches the tone you want to convey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-4 overflow-x-auto pb-2">
          {displayTemplates.map((template) => (
            <div
              key={template.id}
              className={`relative flex-1 min-w-[120px] border rounded-lg p-2 transition-all duration-200 ${
                selectedTemplate === template.id 
                  ? 'border-primary ring-2 ring-primary/20 shadow-md transform scale-105' 
                  : 'border-border hover:border-primary/30 hover:shadow-sm'
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              {/* Template Preview Image */}
              <div 
                className="relative w-full aspect-[1/1.4] rounded-md overflow-hidden cursor-pointer"
              >
                <Image 
                  src={template.imageUrl || "/placeholder.svg"} 
                  alt={template.name}
                  className="object-cover w-full h-full transition-opacity duration-200"
                  fallback="/placeholder.svg"
                />
                
                {/* Selection Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-md">
                    <Check size={14} />
                  </div>
                )}
              </div>
              
              {/* Template Name - smaller and more subtle */}
              <div className="mt-2 text-center">
                <span className="text-xs font-medium text-muted-foreground">{template.name}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
