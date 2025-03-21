
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FileUploadAreaProps {
  onFileSelect: (selectedFile: File) => void;
}

const FileUploadArea = ({ onFileSelect }: FileUploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);

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

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <FileText className="w-12 h-12 mb-4 text-gray-400" />
      
      <h3 className="text-lg font-medium mb-1">
        Upload your CV
      </h3>
      
      <p className="text-muted-foreground text-sm mb-6">
        Drag and drop your CV or click to browse
      </p>
      
      <div>
        <input
          type="file"
          id="cv-upload"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileInputChange}
        />
        <label htmlFor="cv-upload">
          <Button 
            variant="outline" 
            className="cursor-pointer rounded-full px-6 font-medium border-gray-300 isolate hover:bg-[#46235C] hover:text-white hover:border-transparent" 
            asChild
          >
            <span>Choose File</span>
          </Button>
        </label>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        Supported formats: PDF, Word, TXT
      </p>
    </div>
  );
};

export default FileUploadArea;
