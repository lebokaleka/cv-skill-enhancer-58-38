
import { File as FileIcon, FileText, FileType2 } from 'lucide-react';
import React from 'react';

export const getFileIcon = (file: File | null) => {
  if (!file) return <FileText className="w-10 h-10 mb-3 text-gray-400" />;
  
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') {
    return <FileText className="w-10 h-10 text-red-500" />;
  } else if (extension === 'doc' || extension === 'docx') {
    return <FileIcon className="w-10 h-10 text-blue-500" />;
  } else if (extension === 'txt') {
    return <FileType2 className="w-10 h-10 text-gray-500" />;
  }
  return <FileText className="w-10 h-10 text-gray-400" />;
};

export const getFileType = (file: File | null) => {
  if (!file) return '';
  
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'pdf') {
    return 'PDF Document';
  } else if (extension === 'doc' || extension === 'docx') {
    return 'Word Document';
  } else if (extension === 'txt') {
    return 'Text Document';
  }
  return 'Document';
};

export const formatFileName = (file: File | null) => {
  if (!file) return '';
  return file.name.length > 25 ? file.name.substring(0, 22) + '...' : file.name;
};
