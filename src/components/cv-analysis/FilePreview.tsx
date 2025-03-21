import React, { useState, useRef } from 'react';
import { FileText, File, FileType2, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  fileName: string;
  onReset: () => void;
  onFileSelect?: (file: File) => void;
}

const FilePreview = ({
  fileName,
  onReset,
  onFileSelect
}: FilePreviewProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = () => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return <FileText className="w-10 h-10 text-red-500" />;
    } else if (extension === 'doc' || extension === 'docx') {
      return <File className="w-10 h-10 text-blue-500" />;
    } else if (extension === 'txt') {
      return <FileType2 className="w-10 h-10 text-gray-500" />;
    }
    return <FileText className="w-10 h-10 text-gray-400" />;
  };

  const getFileType = () => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return 'PDF Document';
    } else if (extension === 'doc' || extension === 'docx') {
      return 'Word Document';
    } else if (extension === 'txt') {
      return 'Text Document';
    }
    return 'Document';
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onFileSelect) {
        onFileSelect(e.target.files[0]);
      } else {
        onReset();
      }
    }
  };

  const displayFileName = fileName.length > 25 ? fileName.substring(0, 22) + '...' : fileName;

  return (
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
          {getFileIcon()}
        </div>
        <div className="text-left flex-1 min-w-0">
          <p className="font-medium truncate" title={fileName}>
            {displayFileName}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {getFileType()}
          </p>
        </div>
        {isHovering && fileName.length > 25 && (
          <div className="absolute mt-10 z-10 bg-black/80 text-white text-xs p-2 rounded shadow">
            {fileName}
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
          onChange={handleFileChange}
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
  );
};

export default FilePreview;
