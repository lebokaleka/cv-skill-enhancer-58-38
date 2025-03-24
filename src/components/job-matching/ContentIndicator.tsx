
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ContentIndicatorProps {
  onClick: () => void;
  isExpanded: boolean;
}

const ContentIndicator = ({ onClick, isExpanded }: ContentIndicatorProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-2 cursor-pointer transition-opacity z-10"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center gap-1 text-sm text-muted-foreground transition-all ${isHovered ? 'font-semibold' : 'font-normal'}`}>
        <span>{isExpanded ? "Less content" : "More content"}</span>
        {isExpanded ? (
          <ChevronUp size={16} className={`transition-transform ${isHovered ? 'translate-y-0.5' : ''}`} />
        ) : (
          <ChevronDown size={16} className={`transition-transform ${isHovered ? 'translate-y-0.5' : ''}`} />
        )}
      </div>
    </div>
  );
};

export default ContentIndicator;
