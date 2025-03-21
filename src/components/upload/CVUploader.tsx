
import { useState } from 'react';
import FileDropZone from './FileDropZone';
import FilePreviewCard from './FilePreviewCard';

interface CVUploaderProps {
  onUpload: (text: string, fileName?: string) => void;
}

const CVUploader = ({ onUpload }: CVUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

  const handleDifferentFileSelect = () => {
    // Reset state to trigger re-render but maintain 'success' state
    setUploadState('idle');
    setFile(null);
  };

  // If a file is uploaded successfully, show the success state design
  if (uploadState === 'success' && file) {
    return (
      <FilePreviewCard
        file={file}
        onSelectDifferentFile={handleDifferentFileSelect}
      />
    );
  }

  // Default state (no file uploaded yet)
  return (
    <FileDropZone
      onFileSelect={handleFileSelect}
    />
  );
};

export default CVUploader;
