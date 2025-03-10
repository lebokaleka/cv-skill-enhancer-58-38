
import { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, Check, X, ArrowUp } from 'lucide-react';

interface CVUploaderProps {
  onUpload: (text: string, fileName?: string) => void;
}

const CVUploader = ({ onUpload }: CVUploaderProps) => {
  const [cvText, setCvText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCvText(e.target.value);
  };

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
          setCvText(e.target.result);
        }
      };
      
      reader.readAsText(selectedFile);
    }
    
    setUploadState('success');
  };

  const handleSubmit = () => {
    setUploadState('loading');
    
    // Simulate processing
    setTimeout(() => {
      onUpload(cvText, file?.name);
      setUploadState('success');
    }, 1000);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-6 transition-all duration-200 bg-purple-300/50 ${
        isDragging 
          ? 'border-gray-700 bg-gray-700/5' 
          : file 
            ? 'border-green-400 bg-green-50 dark:bg-green-900/10' 
            : 'border-purple-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-purple-700 flex items-center justify-center text-white">
          {file ? <FileText size={30} /> : <ArrowUp size={30} />}
        </div>
        
        <h3 className="text-lg font-medium mb-2">
          {file ? 'CV Uploaded' : 'Upload Your CV'}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-6">
          {file 
            ? `File: ${file.name}`
            : 'Drag and drop your CV, or click to browse'
          }
        </p>
        
        {!file && (
          <div>
            <input
              type="file"
              id="cv-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInputChange}
            />
            <label htmlFor="cv-upload">
              <Button variant="secondary" className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>
        )}
        
        {file && uploadState === 'success' && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setFile(null);
              setCvText('');
              setUploadState('idle');
            }}
          >
            Remove File
          </Button>
        )}
      </div>
    </div>
  );
};

export default CVUploader;
