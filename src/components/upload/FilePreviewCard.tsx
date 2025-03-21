
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import { getFileIcon, getFileType, formatFileName } from './utils/fileTypeUtils';

interface FilePreviewCardProps {
  file: File;
  onSelectDifferentFile: () => void;
}

const FilePreviewCard = ({ file, onSelectDifferentFile }: FilePreviewCardProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const displayFileName = formatFileName(file);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onSelectDifferentFile();
    }
  };

  return (
    <div
      className="border border-dashed border-green-300 rounded-lg p-8 bg-green-50 dark:bg-green-900/10"
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-green-50 dark:bg-green-900/20 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        
        <h3 className="text-lg font-medium mb-1">
          Upload your CV
        </h3>
        
        <div 
          className="rounded-lg p-3 mb-4 flex items-center gap-3 mx-auto" 
          onMouseEnter={() => setIsHovering(true)} 
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="bg-white dark:bg-gray-700 rounded-full p-2 shadow-sm">
            {getFileIcon(file)}
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="font-medium truncate" title={file.name}>
              {displayFileName}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {getFileType(file)}
            </p>
          </div>
          {isHovering && file.name.length > 25 && (
            <div className="absolute mt-10 z-10 bg-black/80 text-white text-xs p-2 rounded shadow">
              {file.name}
            </div>
          )}
        </div>
        
        <div>
          <input
            type="file"
            ref={fileInputRef}
            id="new-cv-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInputChange}
          />
          <Button 
            variant="outline" 
            className="rounded-full px-6 font-medium border-gray-300 isolate hover:bg-[#46235C] hover:text-white hover:border-transparent" 
            onClick={handleButtonClick}
          >
            Choose Different File
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Supported formats: PDF, Word, TXT
        </p>
      </div>
    </div>
  );
};

export default FilePreviewCard;
