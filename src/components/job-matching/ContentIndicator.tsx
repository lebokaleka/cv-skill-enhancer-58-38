
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ContentIndicatorProps {
  onClick: () => void;
}

const ContentIndicator = ({ onClick }: ContentIndicatorProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-4 cursor-pointer transition-opacity z-20"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center gap-1 text-sm text-muted-foreground transition-all ${isHovered ? 'font-semibold' : 'font-normal'}`}>
        <span>More content</span>
        <ChevronDown size={16} className={`transition-transform ${isHovered ? 'translate-y-0.5' : ''}`} />
      </div>
    </div>
  );
};

export default ContentIndicator;
