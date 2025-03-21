import React, { useState } from 'react';
import { FileText, File, FileType2, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
interface FilePreviewProps {
  fileName: string;
  onReset: () => void;
}
const FilePreview = ({
  fileName,
  onReset
}: FilePreviewProps) => {
  const [isHovering, setIsHovering] = useState(false);
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
  const displayFileName = fileName.length > 25 ? fileName.substring(0, 22) + '...' : fileName;
  return <div className="flex flex-col items-center justify-center text-center w-full">
      <div className="bg-white dark:bg-gray-200/50 rounded-2xl shadow-sm border-dashed border-green-100 dark:border-green-800/10 p-8 max-w-md w-full py-[32px] px-[73px]">
        <div className="rounded-full bg-green-50 dark:bg-green-900/20 w-16 h-16 mx-auto mb-5 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        
        <h3 className="text-xl font-semibold mb-5">
          File Selected
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-800/60 rounded-lg p-4 mb-6 flex items-center gap-4 mx-auto" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="bg-white dark:bg-gray-700 rounded-full p-3 shadow-sm">
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
          {isHovering && fileName.length > 25 && <div className="absolute mt-10 z-10 bg-black/80 text-white text-xs p-2 rounded shadow">
              {fileName}
            </div>}
        </div>
        
        <Button variant="outline" className="rounded-full px-6 font-medium border-gray-300 isolate hover:bg-[#46235C] hover:text-white hover:border-transparent w-full" onClick={onReset}>
          Choose Different File
        </Button>
      </div>
    </div>;
};
export default FilePreview;