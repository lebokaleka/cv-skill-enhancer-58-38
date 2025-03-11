
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoverLetterTemplate } from "./coverLetterTemplates";
import Image from "@/components/ui/image";
import { Check } from "lucide-react";
import { useState } from "react";

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
            >
              <div className="flex flex-col gap-2">
                {/* Template Preview Image - Direct Preview */}
                <div 
                  className="relative w-full aspect-[1/1.4] rounded-md overflow-hidden cursor-pointer"
                  onClick={() => onSelectTemplate(template.id)}
                >
                  {template.imageUrl && (
                    <Image 
                      src={template.imageUrl} 
                      alt={template.name}
                      className="object-cover w-full h-full transition-opacity duration-200"
                    />
                  )}
                  
                  {/* Selection Indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-1.5 right-1.5 bg-primary text-white rounded-full p-0.5">
                      <Check size={12} />
                    </div>
                  )}
                </div>
                
                {/* Template Info */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-sm font-semibold mb-0.5 line-clamp-1">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Style: </span>
                      <span className="line-clamp-1">{template.style}</span>
                    </div>
                  </div>
                  
                  {/* Selection Button */}
                  <button
                    onClick={() => onSelectTemplate(template.id)}
                    className={`mt-2 w-full py-1 px-2 rounded text-xs font-medium transition-colors duration-200 ${
                      selectedTemplate === template.id 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
