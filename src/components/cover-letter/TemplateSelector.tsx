
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoverLetterTemplate } from "./coverLetterTemplates";
import Image from "@/components/ui/image";
import { Eye, Check } from "lucide-react";
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
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  return (
    <Card className="glass-card border-dashed">
      <CardHeader>
        <CardTitle>Choose a Template</CardTitle>
        <CardDescription>
          Select a template that matches the tone you want to convey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative border rounded-xl p-3 transition-all duration-200 ${
                selectedTemplate === template.id 
                  ? 'border-primary ring-2 ring-primary/20 shadow-md' 
                  : 'border-border hover:border-primary/30 hover:shadow'
              }`}
            >
              <div className="flex flex-col gap-3">
                {/* Template Preview Image */}
                <div 
                  className="relative w-full aspect-[1/1.4] rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => onSelectTemplate(template.id)}
                  onMouseEnter={() => setPreviewTemplate(template.id)}
                  onMouseLeave={() => setPreviewTemplate(null)}
                >
                  {template.imageUrl && (
                    <Image 
                      src={template.imageUrl} 
                      alt={template.name}
                      className={`object-cover w-full h-full transition-opacity duration-200 ${
                        previewTemplate === template.id ? 'opacity-80' : 'opacity-100'
                      }`}
                    />
                  )}
                  
                  {/* Selection Indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                      <Check size={16} />
                    </div>
                  )}
                  
                  {/* Preview Button Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                    previewTemplate === template.id ? 'opacity-100' : 'opacity-0'
                  } group-hover:opacity-100`}>
                    <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-sm">
                      <Eye size={18} className="text-primary" />
                    </div>
                  </div>
                </div>
                
                {/* Template Info */}
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {template.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Style: </span>
                      <span>{template.style}</span>
                    </div>
                  </div>
                  
                  {/* Selection Button */}
                  <button
                    onClick={() => onSelectTemplate(template.id)}
                    className={`mt-3 w-full py-1.5 px-2 rounded-md text-xs font-medium transition-colors duration-200 ${
                      selectedTemplate === template.id 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
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
