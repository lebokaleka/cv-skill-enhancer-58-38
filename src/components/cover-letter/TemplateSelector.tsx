
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
      data-template-id={template.id}
    >
      {/* Template Preview Image Container */}
      <div className="relative cursor-pointer" onClick={onSelect} data-template-preview>
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
              <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1 shadow-sm z-10" data-template-selected-indicator>
                <Check size={16} />
              </div>
            )}
          </div>
        </AspectRatio>
      </div>
      
      {/* Button Only - No Title Text */}
      <div className="p-3" data-template-button-container>
        <Button 
          size="sm" 
          variant={isSelected ? "default" : "outline"} 
          className={`w-full transition-all duration-200 ${
            isSelected ? '' : 'text-gray-700 border-gray-300'
          }`} 
          onClick={onSelect}
          data-template-button
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
          {/* Template 1 Container */}
          <div data-template-container="template-1" className="template-container">
            {templates.length > 0 && (
              <TemplateCard 
                key={templates[0].id} 
                template={templates[0]} 
                isSelected={selectedTemplate === templates[0].id} 
                onSelect={() => onSelectTemplate(templates[0].id)} 
              />
            )}
          </div>
          
          {/* Template 2 Container */}
          <div data-template-container="template-2" className="template-container">
            {templates.length > 1 && (
              <TemplateCard 
                key={templates[1].id} 
                template={templates[1]} 
                isSelected={selectedTemplate === templates[1].id} 
                onSelect={() => onSelectTemplate(templates[1].id)} 
              />
            )}
          </div>
          
          {/* Template 3 Container */}
          <div data-template-container="template-3" className="template-container">
            {templates.length > 2 && (
              <TemplateCard 
                key={templates[2].id} 
                template={templates[2]} 
                isSelected={selectedTemplate === templates[2].id} 
                onSelect={() => onSelectTemplate(templates[2].id)} 
              />
            )}
          </div>
          
          {/* Template 4 Container */}
          <div data-template-container="template-4" className="template-container">
            {templates.length > 3 && (
              <TemplateCard 
                key={templates[3].id} 
                template={templates[3]} 
                isSelected={selectedTemplate === templates[3].id} 
                onSelect={() => onSelectTemplate(templates[3].id)} 
              />
            )}
          </div>
          
          {/* Template 5 Container */}
          <div data-template-container="template-5" className="template-container">
            {templates.length > 4 && (
              <TemplateCard 
                key={templates[4].id} 
                template={templates[4]} 
                isSelected={selectedTemplate === templates[4].id} 
                onSelect={() => onSelectTemplate(templates[4].id)} 
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSelector;
