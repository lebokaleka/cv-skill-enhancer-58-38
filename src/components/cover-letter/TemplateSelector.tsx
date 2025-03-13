
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  // Show all available templates in the display
  const displayTemplates = templates;
  
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
              className={`relative flex-1 min-w-[120px] border rounded-lg p-2 transition-all duration-300 ${
                selectedTemplate === template.id 
                  ? 'border-primary ring-2 ring-primary/20 shadow-md transform scale-105' 
                  : 'border-border hover:border-primary/30 hover:shadow-sm'
              }`}
            >
              {/* Template Preview Image */}
              <div 
                className="relative w-full aspect-[1/1.4] rounded-md overflow-hidden cursor-pointer mb-3"
                onClick={() => onSelectTemplate(template.id)}
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
              
              {/* "Use This" Button - Replacing the template name text */}
              <div className="w-full flex justify-center">
                <Button
                  size="sm"
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  className={`w-full transition-all duration-300 ${
                    selectedTemplate === template.id 
                      ? 'shadow-md' 
                      : 'hover:shadow-sm'
                  }`}
                  onClick={() => onSelectTemplate(template.id)}
                >
                  {selectedTemplate === template.id ? (
                    <>
                      <Check size={14} className="mr-1" />
                      Selected
                    </>
                  ) : (
                    "Use This"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
