
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDropzone } from 'react-dropzone';
import { FileText, Upload } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface CVUploadSectionProps {
  onAnalyze: (text: string, fileName?: string) => void;
  isAnalyzing: boolean;
}

const CVUploadSection = ({ onAnalyze, isAnalyzing }: CVUploadSectionProps) => {
  const [cvText, setCVText] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCVText(result);
      };
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  const handleUpload = () => {
    if (cvText.trim()) {
      onAnalyze(cvText);
    }
  };

  return (
    <div className="animate-scale-in">
      <Card className={`glass-card border border-dashed p-8 ${isDragActive ? 'cv-analysis-drag-active' : ''}`}>
        <div className="text-center space-y-4">
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Upload Your CV</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-4">
              Drag and drop your CV file, or click to browse your files
            </p>
            <Button variant="outline" className="mb-6">
              <Upload className="mr-2 h-4 w-4" /> Select File
            </Button>
          </div>

          <div className="my-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-2 text-muted-foreground text-sm">Or paste your CV text</span>
            </div>
          </div>

          <Textarea 
            value={cvText}
            onChange={(e) => setCVText(e.target.value)}
            placeholder="Paste your CV content here..."
            className="min-h-[200px] mt-4"
          />

          <Button 
            onClick={handleUpload} 
            className="cv-analysis-button mt-6 w-full md:w-auto md:px-8"
            disabled={!cvText.trim() || isAnalyzing}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze CV'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CVUploadSection;
