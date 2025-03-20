
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FileText, FileType, File } from 'lucide-react';
import React from 'react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFileTypeIcon(fileType: string) {
  // PDF files
  if (fileType.toLowerCase() === 'pdf') {
    return <FileText className="text-red-500" />;
  }
  
  // Word documents
  if (fileType.toLowerCase() === 'doc' || fileType.toLowerCase() === 'docx') {
    return <FileText className="text-blue-500" />;
  }
  
  // Text files
  if (fileType.toLowerCase() === 'txt') {
    return <FileType className="text-gray-500" />;
  }
  
  // Default file icon for other types
  return <File className="text-gray-400" />;
}
