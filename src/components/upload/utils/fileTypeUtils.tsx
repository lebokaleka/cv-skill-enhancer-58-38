
import { File as FileIcon, FileText, FileType2 } from 'lucide-react';
import React from 'react';

export const getFileIcon = (file: File | null, fileName = '') => {
  // Get extension from file object or fileName string
  const extension = file 
    ? file.name.split('.').pop()?.toLowerCase() 
    : fileName.split('.').pop()?.toLowerCase();
    
  if (!file && !fileName) return <FileText className="w-10 h-10 mb-3 text-gray-400" />;
  
  if (extension === 'pdf') {
    return <FileText className="w-10 h-10 text-red-500" />;
  } else if (extension === 'doc' || extension === 'docx') {
    return <FileIcon className="w-10 h-10 text-blue-500" />;
  } else if (extension === 'txt') {
    return <FileType2 className="w-10 h-10 text-gray-500" />;
  }
  return <FileText className="w-10 h-10 text-gray-400" />;
};

export const getFileType = (file: File | null, fileName = '') => {
  if (!file && !fileName) return '';
  
  // Get extension from file object or fileName string
  const extension = file 
    ? file.name.split('.').pop()?.toLowerCase() 
    : fileName.split('.').pop()?.toLowerCase();
  
  if (extension === 'pdf') {
    return 'PDF Document';
  } else if (extension === 'doc' || extension === 'docx') {
    return 'Word Document';
  } else if (extension === 'txt') {
    return 'Text Document';
  }
  return 'Document';
};

export const formatFileName = (file: File | null, fileName = '') => {
  const displayName = file ? file.name : fileName;
  if (!displayName) return '';
  
  return displayName.length > 25 ? displayName.substring(0, 22) + '...' : displayName;
};
