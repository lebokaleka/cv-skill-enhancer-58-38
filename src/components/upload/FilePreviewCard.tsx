
import React from 'react';
import { Button } from "@/components/ui/button";
import { getFileIcon, getFileType, formatFileName } from './utils/fileTypeUtils';

interface FilePreviewCardProps {
  file: File;
  onSelectDifferentFile: () => void;
}

const FilePreviewCard: React.FC<FilePreviewCardProps> = ({ file, onSelectDifferentFile }) => {
  const fileIcon = getFileIcon(file);
  const fileType = getFileType(file);
  const fileName = formatFileName(file);

  return (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-700 flex flex-col items-center text-center">
      {fileIcon}
      <p className="mb-1 text-sm text-gray-900 dark:text-white">{fileName}</p>
      <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">{fileType}</p>
      <Button
        variant="outline"
        size="sm"
        onClick={onSelectDifferentFile}
        className="text-xs"
      >
        Select a different file
      </Button>
    </div>
  );
};

export default FilePreviewCard;
