
import React, { useState } from 'react';
import FileUploadArea from './FileUploadArea';
import FilePreview from './FilePreview';

interface UploadTabProps {
  onFileSelect: (text: string, fileName: string) => void;
  fileName?: string;
}

const UploadTab = ({ onFileSelect, fileName = '' }: UploadTabProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState(fileName);
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    fileName ? 'success' : 'idle'
  );

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setUploadState('error');
      return;
    }
    
    setFile(selectedFile);
    setSelectedFileName(selectedFile.name);
    
    if (selectedFile.type === 'text/plain') {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onFileSelect(e.target.result, selectedFile.name);
        }
      };
      
      reader.readAsText(selectedFile);
    } else {
      // For non-text files
      onFileSelect("File uploaded: " + selectedFile.name, selectedFile.name);
    }
    
    setUploadState('success');
  };

  const handleReset = () => {
    setFile(null);
    setSelectedFileName('');
    setUploadState('idle');
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-10 min-h-[400px] flex items-center justify-center transition-all duration-200 ${
        uploadState === 'success'
          ? 'border-green-400 bg-green-50 dark:bg-green-900/10' 
          : uploadState === 'error'
            ? 'border-red-400 bg-red-50 dark:bg-red-900/10'
            : 'border-gray-300 bg-transparent'
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => {}}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFileSelect(e.dataTransfer.files[0]);
        }
      }}
    >
      {uploadState === 'success' ? (
        <FilePreview 
          fileName={selectedFileName} 
          onReset={handleReset} 
          onFileSelect={handleFileSelect}
        />
      ) : (
        <FileUploadArea onFileSelect={handleFileSelect} />
      )}
    </div>
  );
};

export default UploadTab;
