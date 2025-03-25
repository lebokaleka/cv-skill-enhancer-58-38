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
interface TemplateCardProps {
  template: CoverLetterTemplate;
  isSelected: boolean;
  onSelect: () => void;
}

// Single template card component for better customization
const TemplateCard = ({
  template,
  isSelected,
  onSelect
}: TemplateCardProps) => {
  return <Card key={template.id} className={`transition-all duration-300 overflow-hidden h-full ${isSelected ? 'ring-2 ring-primary/50 shadow-md' : 'hover:shadow-sm'}`}>
      {/* Template Preview Image */}
      <div className="relative w-full aspect-[1/1.54] overflow-hidden cursor-pointer" onClick={onSelect}>
        {template.imageUrl ? <Image src={template.imageUrl} alt={template.name} className="transition-opacity duration-200" fallback="/placeholder.svg" /> : <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
            <span className="text-xs">No preview</span>
          </div>}
        
        {/* Selection Indicator */}
        {isSelected && <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1 shadow-md">
            <Check size={14} />
          </div>}
      </div>
      
      {/* Template Information */}
      <div className="p-3">
        <h3 className="text-sm font-medium mb-1 truncate">{template.name}</h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{template.description}</p>
        
        <Button size="sm" variant={isSelected ? "default" : "outline"} className={`w-full transition-all duration-300 ${isSelected ? 'shadow-md' : 'hover:shadow-sm'}`} onClick={onSelect}>
          {isSelected ? <>
              <Check size={14} className="mr-1" />
              Selected
            </> : "Use This"}
        </Button>
      </div>
    </Card>;
};
const TemplateSelector = ({
  templates,
  selectedTemplate,
  onSelectTemplate
}: TemplateSelectorProps) => {
  return <Card className="glass-card border-dashed my-[22px]">
      <CardHeader className="py-4">
        <CardTitle>Choose a Template</CardTitle>
        <CardDescription>
          Select a template that matches the tone you want to convey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {templates.map(template => <TemplateCard key={template.id} template={template} isSelected={selectedTemplate === template.id} onSelect={() => onSelectTemplate(template.id)} />)}
        </div>
      </CardContent>
    </Card>;
};
export default TemplateSelector;