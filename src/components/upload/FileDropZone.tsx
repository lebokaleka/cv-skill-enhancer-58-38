
import { useState, ChangeEvent, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

interface FileDropZoneProps {
  onFileSelect: (file: File) => void;
}

const FileDropZone = ({ onFileSelect }: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    // Prevent default to avoid any bubbling that might cause double triggers
    e.preventDefault();
    
    setIsButtonAnimating(true);
    setTimeout(() => {
      setIsButtonAnimating(false);
    }, 500);
    
    // Directly click the file input
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`border border-dashed rounded-lg p-5 transition-all duration-200 ${
        isDragging 
          ? 'border-gray-400 bg-gray-50 dark:bg-gray-800/30' 
          : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center py-4">
        <FileText className="w-10 h-10 mb-3 text-gray-400" />
        
        <h3 className="text-base font-medium mb-1">
          Upload your CV
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3">
          Drag and drop your CV or click to browse
        </p>
        
        <div className="mb-4">
          <input
            type="file"
            id="cv-upload"
            className="hidden"
            ref={fileInputRef}
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInputChange}
          />
          <Button 
            variant="outline" 
            className={`cursor-pointer rounded-full px-6 font-medium border-gray-300 isolate transition-all duration-200 ${
              isButtonAnimating 
                ? 'bg-[#46235C] text-white border-[#46235C]' 
                : 'hover:bg-[#46235C] hover:text-white hover:border-transparent'
            }`}
            onClick={handleButtonClick}
          >
            Choose File
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Supported formats: PDF, Word, TXT
        </p>
      </div>
    </div>
  );
};

export default FileDropZone;
