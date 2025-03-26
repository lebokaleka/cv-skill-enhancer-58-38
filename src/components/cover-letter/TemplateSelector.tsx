
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

interface TemplateCardProps {
  template: CoverLetterTemplate;
  isSelected: boolean;
  onSelect: () => void;
}

// Single template card component
const TemplateCard = ({
  template,
  isSelected,
  onSelect
}: TemplateCardProps) => {
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden transition-all duration-200 h-full ${
        isSelected ? 'ring-2 ring-primary shadow-md' : 'border border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Template Preview Image Container */}
      <div className="relative cursor-pointer" onClick={onSelect}>
        <AspectRatio ratio={1 / 1.414} className="bg-white">
          <div className="w-full h-full relative">
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
      
      {/* Button Only - No Title Text */}
      <div className="p-3">
        <Button 
          size="sm" 
          variant={isSelected ? "default" : "outline"} 
          className={`w-full transition-all duration-200 ${
            isSelected ? '' : 'text-gray-700 border-gray-300'
          }`} 
          onClick={onSelect}
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
  );
};

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
            <TemplateCard 
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

export default TemplateSelector;
