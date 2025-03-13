
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
  return (
    <Card className="glass-card border-dashed">
      <CardHeader className="py-4">
        <CardTitle>Choose a Template</CardTitle>
        <CardDescription>
          Select a template that matches the tone you want to convey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative border rounded-lg p-2 transition-all duration-200 ${
                selectedTemplate === template.id 
                  ? 'border-primary ring-1 ring-primary/20 shadow-sm' 
                  : 'border-border hover:border-primary/30 hover:shadow-sm'
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              {/* Template Preview Image */}
              <div 
                className="relative w-full aspect-[1/1.4] rounded-md overflow-hidden cursor-pointer"
              >
                {template.imageUrl && (
                  <Image 
                    src={template.imageUrl} 
                    alt={template.name}
                    className="object-cover w-full h-full transition-opacity duration-200"
                    fallback="/placeholder.svg"
                  />
                )}
                
                {/* Selection Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-1.5 right-1.5 bg-primary text-white rounded-full p-0.5">
                    <Check size={12} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
