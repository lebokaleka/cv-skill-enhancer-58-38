
import React from 'react';
import { FileText, File, FileType2, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  fileName: string;
  onReset: () => void;
}

const FilePreview = ({ fileName, onReset }: FilePreviewProps) => {
  const getFileIcon = () => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (extension === 'pdf') {
      return <FileText className="w-12 h-12 mb-4 text-red-500" />;
    } else if (extension === 'doc' || extension === 'docx') {
      return <File className="w-12 h-12 mb-4 text-blue-500" />;
    } else if (extension === 'txt') {
      return <FileType2 className="w-12 h-12 mb-4 text-gray-500" />;
    }
    
    return <FileText className="w-12 h-12 mb-4 text-gray-400" />;
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

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-green-100 dark:border-green-800/30 p-8 max-w-md">
        <div className="rounded-full bg-green-50 dark:bg-green-900/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        
        {getFileIcon()}
        
        <h3 className="text-xl font-semibold mb-3">
          File Selected
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-800/60 rounded-lg px-6 py-3 mb-6 mx-auto inline-block">
          <p className="font-medium truncate max-w-[240px]">{fileName}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {getFileType()}
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="rounded-full px-6 font-medium border-gray-300 isolate hover:bg-[#46235C] hover:text-white hover:border-transparent w-full" 
          onClick={onReset}
        >
          Choose Different File
        </Button>
      </div>
    </div>
  );
};

export default FilePreview;
