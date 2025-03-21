
import { useState, ChangeEvent, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, File, FileType2, CheckCircle } from 'lucide-react';

interface CVUploaderProps {
  onUpload: (text: string, fileName?: string) => void;
}

const CVUploader = ({ onUpload }: CVUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    // Prevent default to avoid any bubbling that might cause double triggers
    e.preventDefault();
    
    setIsButtonAnimating(true);
    setTimeout(() => {
      setIsButtonAnimating(false);
    }, 500);
    
    // Directly click the file input
    fileInputRef.current?.click();
  };

  const getFileIcon = () => {
    if (!file) return <FileText className="w-10 h-10 mb-3 text-gray-400" />;
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return <File className="w-10 h-10 text-red-500" />;
    } else if (extension === 'doc' || extension === 'docx') {
      return <File className="w-10 h-10 text-blue-500" />;
    } else if (extension === 'txt') {
      return <FileType2 className="w-10 h-10 text-gray-500" />;
    }
    return <FileText className="w-10 h-10 text-gray-400" />;
  };

  const getFileType = () => {
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

  const displayFileName = file?.name && file.name.length > 25 
    ? file.name.substring(0, 22) + '...' 
    : file?.name || '';

  // If a file is uploaded successfully, show the success state design
  if (uploadState === 'success' && file) {
    return (
      <div
        className="border border-dashed border-green-300 rounded-lg p-8 bg-green-50 dark:bg-green-900/10"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-green-50 dark:bg-green-900/20 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          
          <h3 className="text-lg font-medium mb-1">
            Upload your CV
          </h3>
          
          <div 
            className="rounded-lg p-3 mb-4 flex items-center gap-3 mx-auto" 
            onMouseEnter={() => setIsHovering(true)} 
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="bg-white dark:bg-gray-700 rounded-full p-2 shadow-sm">
              {getFileIcon()}
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="font-medium truncate" title={file.name}>
                {displayFileName}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {getFileType()}
              </p>
            </div>
            {isHovering && file.name.length > 25 && (
              <div className="absolute mt-10 z-10 bg-black/80 text-white text-xs p-2 rounded shadow">
                {file.name}
              </div>
            )}
          </div>
          
          <div>
            <input
              type="file"
              ref={fileInputRef}
              id="new-cv-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInputChange}
            />
            <Button 
              variant="outline" 
              className="rounded-full px-6 font-medium border-gray-300 isolate hover:bg-[#46235C] hover:text-white hover:border-transparent" 
              onClick={handleButtonClick}
            >
              Choose Different File
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: PDF, Word, TXT
          </p>
        </div>
      </div>
    );
  }

  // Default state (no file uploaded yet)
  return (
    <div
      className={`border border-dashed rounded-lg p-5 transition-all duration-200 ${
        isDragging 
          ? 'border-gray-400 bg-gray-50 dark:bg-gray-800/30' 
          : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center py-4">
        <FileText className="w-10 h-10 mb-3 text-gray-400" />
        
        <h3 className="text-base font-medium mb-1">
          Upload your CV
        </h3>
        
        <p className="text-sm text-muted-foreground mb-3">
          Drag and drop your CV or click to browse
        </p>
        
        <div className="mb-4">
          <input
            type="file"
            id="cv-upload"
            className="hidden"
            ref={fileInputRef}
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInputChange}
          />
          {/* Remove the htmlFor attribute and use the onClick handler instead */}
          <Button 
            variant="outline" 
            className={`cursor-pointer rounded-full px-6 font-medium border-gray-300 isolate transition-all duration-200 ${
              isButtonAnimating 
                ? 'bg-[#46235C] text-white border-[#46235C]' 
                : 'hover:bg-[#46235C] hover:text-white hover:border-transparent'
            }`}
            onClick={handleButtonClick}
          >
            Choose File
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Supported formats: PDF, Word, TXT
        </p>
      </div>
    </div>
  );
};

export default CVUploader;
