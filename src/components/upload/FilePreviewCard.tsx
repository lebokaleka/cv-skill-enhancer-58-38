
import React from 'react';
import { Button } from "@/components/ui/button";
import { getFileIcon, getFileType, formatFileName } from './utils/fileTypeUtils';
import { CheckCircle } from 'lucide-react';

interface FilePreviewCardProps {
  file: File;
  onSelectDifferentFile: () => void;
}

const FilePreviewCard: React.FC<FilePreviewCardProps> = ({ file, onSelectDifferentFile }) => {
  const fileIcon = getFileIcon(file);
  const fileType = getFileType(file);
  const fileName = formatFileName(file);

  return (
    <div className="p-6 border border-dashed border-gray-300 rounded-lg bg-green-50 dark:border-green-600 dark:bg-green-900/10 flex flex-col items-center text-center min-h-[260px] justify-center">
      {/* Success icon */}
      <div className="mb-4">
        <CheckCircle className="h-8 w-8 text-green-500" />
      </div>
      
      <h3 className="text-lg font-medium mb-4">Upload your CV</h3>
      
      {/* File information */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="flex-shrink-0">
          {fileIcon}
        </div>
        <div className="text-left">
          <p className="font-medium text-gray-900 dark:text-white">{fileName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{fileType}</p>
        </div>
      </div>
      
      {/* Button */}
      <Button
        variant="outline"
        size="default"
        onClick={onSelectDifferentFile}
        className="rounded-full px-6 mb-4"
      >
        Choose Different File
      </Button>
      
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Supported formats: PDF, Word, TXT
      </p>
    </div>
  );
};

export default FilePreviewCard;
