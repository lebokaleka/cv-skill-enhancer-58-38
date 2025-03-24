
import { useState, useEffect } from 'react';
import FileDropZone from './FileDropZone';
import FilePreviewCard from './FilePreviewCard';

interface CVUploaderProps {
  onUpload: (text: string, fileName?: string) => void;
  initialText?: string;
}

const CVUploader = ({ onUpload, initialText = '' }: CVUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [fileContent, setFileContent] = useState<string>(initialText);
  const [fileName, setFileName] = useState<string>('');

  // Check if there's initial text to determine if we should show success state
  useEffect(() => {
    if (initialText && initialText.trim() !== '') {
      setFileContent(initialText);
      
      // Extract filename if it's in the format "File uploaded: filename.ext"
      if (initialText.startsWith('File uploaded:')) {
        const extractedName = initialText.replace('File uploaded:', '').trim();
        setFileName(extractedName);
      } else {
        setFileName('CV.txt'); // Default filename if not specified
      }
      
      setUploadState('success');
    }
  }, [initialText]);

  const processFile = (selectedFile: File) => {
    // Check if file is PDF, DOC, DOCX, or TXT
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setUploadState('error');
      return;
    }
    
    setFile(selectedFile);
    setFileName(selectedFile.name);
    
    // For demonstration purposes, if it's a text file, read and set the content
    if (selectedFile.type === 'text/plain') {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          // Pass the content to the parent component
          const content = e.target.result;
          setFileContent(content);
          onUpload(content, selectedFile.name);
        }
      };
      
      reader.readAsText(selectedFile);
    } else {
      // For non-text files, just pass the file name
      const content = "File uploaded: " + selectedFile.name;
      setFileContent(content);
      onUpload(content, selectedFile.name);
    }
    
    setUploadState('success');
  };

  const handleFileSelect = (selectedFile: File) => {
    processFile(selectedFile);
  };

  const handleDifferentFileSelect = (newFile?: File) => {
    if (newFile) {
      // Process the new file directly
      processFile(newFile);
    } else {
      // Only if explicitly reset (should not happen with new implementation)
      setUploadState('idle');
      setFile(null);
      setFileContent('');
      setFileName('');
    }
  };

  // If a file is uploaded successfully, show the success state design
  if (uploadState === 'success') {
    return (
      <FilePreviewCard
        file={file}
        fileName={fileName}
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
