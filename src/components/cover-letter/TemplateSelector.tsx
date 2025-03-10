
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoverLetterTemplate } from "./coverLetterTemplates";

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedTemplate === template.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border bg-secondary/30'
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <h3 className="font-medium mb-1">{template.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
              <div className="text-xs text-muted-foreground">
                <span>Style: </span>
                <span className="text-foreground">{template.style}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
