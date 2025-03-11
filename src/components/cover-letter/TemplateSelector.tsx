
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoverLetterTemplate } from "./coverLetterTemplates";
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
      <CardHeader>
        <CardTitle>Choose a Template</CardTitle>
        <CardDescription>
          Select a template that matches the tone you want to convey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative border rounded-xl p-3 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id 
                  ? 'border-primary ring-2 ring-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <div className="flex flex-col gap-4">
                <div className="w-full aspect-[1/1.4] relative rounded-lg overflow-hidden">
                  {template.imageUrl && (
                    <img 
                      src={template.imageUrl} 
                      alt={template.name}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Style: </span>
                      <span>{template.style}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      selectedTemplate === template.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {selectedTemplate === template.id ? 'Selected' : 'Click to select'}
                    </div>
                  </div>
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
