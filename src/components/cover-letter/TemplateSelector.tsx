
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CoverLetterTemplate } from "./coverLetterTemplates";
import { Check } from "lucide-react";
import Image from "@/components/ui/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    <Card className="glass-card border-dashed my-[21px]">
      <CardHeader className="py-4">
        <CardTitle>Choose a Template</CardTitle>
        <CardDescription>
          Select a template that matches the tone you want to convey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {templates.map(template => (
            <TemplateBlock 
              key={template.id} 
              template={template} 
              isSelected={selectedTemplate === template.id} 
              onSelect={() => onSelectTemplate(template.id)} 
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Each template is now in its own independent block component
const TemplateBlock = ({
  template,
  isSelected,
  onSelect
}: {
  template: CoverLetterTemplate;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div className="template-block" data-template-id={template.id}>
      <div 
        className={`bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-200 h-full flex flex-col ${
          isSelected ? 'ring-2 ring-primary shadow-md' : 'border border-gray-200 hover:border-gray-300'
        }`}
      >
        {/* Template Image Preview */}
        <div 
          className="template-preview flex-grow cursor-pointer relative" 
          onClick={onSelect}
          data-preview-id={`preview-${template.id}`}
        >
          <AspectRatio ratio={1 / 1.414} className="bg-white">
            <div className="w-full h-full">
              <Image 
                src={template.imageUrl} 
                alt={template.name}
                fallback="/placeholder.svg" 
                objectFit="contain"
              />
              
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1 shadow-sm z-10">
                  <Check size={16} />
                </div>
              )}
            </div>
          </AspectRatio>
        </div>
        
        {/* Template Selection Button */}
        <div className="template-action w-full">
          <Button 
            size="lg" 
            variant={isSelected ? "default" : "outline"} 
            className={`w-full rounded-t-none transition-all duration-200 ${
              isSelected ? '' : 'text-gray-700 border-gray-300'
            }`} 
            onClick={onSelect}
            data-button-id={`button-${template.id}`}
          >
            {isSelected ? (
              <>
                <Check size={14} className="mr-1" />
                Selected
              </>
            ) : "Use This"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
