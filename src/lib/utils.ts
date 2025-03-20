
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FileText, FileCode, File } from 'lucide-react'
import React from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFileTypeIcon(fileName: string) {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return (
        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400">
          <FileText className="h-5 w-5" />
        </div>
      );
    case 'doc':
    case 'docx':
      return (
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
          <FileText className="h-5 w-5" />
        </div>
      );
    case 'txt':
      return (
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400">
          <FileText className="h-5 w-5" />
        </div>
      );
    default:
      return (
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400">
          <File className="h-5 w-5" />
        </div>
      );
  }
}
