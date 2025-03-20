
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-2 px-[15px] my-0 py-[16px]">
          {displayTemplates.map(template => (
            <Card 
              key={template.id} 
              className={`transition-all duration-300 overflow-hidden h-full ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary/50 shadow-md' 
                  : 'hover:shadow-sm'
              }`}
            >
              {/* Template Preview Image */}
              <div 
                className="relative w-full aspect-[1/1.54] overflow-hidden cursor-pointer" 
                onClick={() => onSelectTemplate(template.id)}
              >
                {template.imageUrl ? (
                  <Image 
                    src={template.imageUrl} 
                    alt={template.name} 
                    className="object-cover w-full h-full transition-opacity duration-200" 
                    fallback="/placeholder.svg" 
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <span className="text-xs">No preview</span>
                  </div>
                )}
                
                {/* Selection Indicator */}
                {selectedTemplate === template.id && (
                  <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-md">
                    <Check size={14} />
                  </div>
                )}
              </div>
              
              {/* "Use This" Button */}
              <div className="p-3">
                <Button 
                  size="sm" 
                  variant={selectedTemplate === template.id ? "default" : "outline"} 
                  className={`w-full transition-all duration-300 ${
                    selectedTemplate === template.id ? 'shadow-md' : 'hover:shadow-sm'
                  }`} 
                  onClick={() => onSelectTemplate(template.id)}
                >
                  {selectedTemplate === template.id ? (
                    <>
                      <Check size={14} className="mr-1" />
                      Selected
                    </>
                  ) : "Use This"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
