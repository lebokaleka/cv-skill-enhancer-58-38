
import { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from 'lucide-react';

interface CVUploaderProps {
  onUpload: (text: string, fileName?: string) => void;
}

const CVUploader = ({ onUpload }: CVUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Check if file is PDF, DOC, DOCX, or TXT
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setUploadState('error');
      return;
    }
    
    setFile(selectedFile);
    
    // For demonstration purposes, if it's a text file, read and set the content
    if (selectedFile.type === 'text/plain') {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          // Pass the content to the parent component
          onUpload(e.target.result, selectedFile.name);
        }
      };
      
      reader.readAsText(selectedFile);
    } else {
      // For non-text files, just pass the file name
      onUpload("File uploaded: " + selectedFile.name, selectedFile.name);
    }
    
    setUploadState('success');
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
        isDragging 
          ? 'border-gray-400 bg-gray-50 dark:bg-gray-800/30' 
          : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center py-5">
        <FileText className="w-12 h-12 mb-4 text-gray-400" />
        
        <h3 className="text-base font-medium mb-1">
          Upload your CV
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop your CV or click to browse
        </p>
        
        <div className="mb-5">
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
              className="cursor-pointer rounded-full px-5 py-1 h-8 border-gray-300 bg-gray-50 hover:bg-gray-100 hover:text-gray-800 text-gray-700 text-xs" 
              asChild
            >
              <span>Choose File</span>
            </Button>
          </label>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Supported formats: PDF, Word, TXT
        </p>
      </div>
    </div>
  );
};

export default CVUploader;
