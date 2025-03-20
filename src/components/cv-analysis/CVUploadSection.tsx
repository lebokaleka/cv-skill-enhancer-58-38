
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, File, Upload, FileInput, X, ArrowRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { getFileTypeIcon } from '@/lib/utils';

interface CVUploadSectionProps {
  onAnalyze: (cvText: string, fileName?: string) => void;
  isAnalyzing: boolean;
}

const CVUploadSection = ({ onAnalyze, isAnalyzing }: CVUploadSectionProps) => {
  const [cvText, setCvText] = useState('');
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [inputMethod, setInputMethod] = useState<'upload' | 'paste'>('upload');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(selectedFile.type)) {
      setUploadState('error');
      return;
    }
    
    setFile(selectedFile);
    setFileName(selectedFile.name);
    
    if (selectedFile.type === 'text/plain') {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          // Pass the content to the parent component
          onAnalyze(e.target.result, selectedFile.name);
        }
      };
      
      reader.readAsText(selectedFile);
    } else {
      // For non-text files, just pass the file name
      onAnalyze("File uploaded: " + selectedFile.name, selectedFile.name);
    }
    
    setUploadState('success');
  };

  const resetFileSelection = () => {
    setFile(null);
    setFileName('');
    setUploadState('idle');
  };

  const handleCVUpload = () => {
    if (inputMethod === 'paste') {
      onAnalyze(cvText);
    }
  };

  return (
    <div className="animate-scale-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">CV Analysis & Optimization</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your CV to receive a score, ATS compatibility check, and actionable improvements.
        </p>
      </div>

      <Card className="shadow-md overflow-hidden border">
        <div className="pt-6 px-6">
          <Tabs defaultValue="upload" className="w-full" onValueChange={(value) => setInputMethod(value as 'upload' | 'paste')}>
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6 rounded-full overflow-hidden">
              <TabsTrigger 
                value="upload" 
                className="data-[state=active]:bg-[#46235C] data-[state=active]:text-white data-[state=active]:isolate bg-gray-100 dark:bg-gray-800"
              >
                Upload File
              </TabsTrigger>
              <TabsTrigger 
                value="paste" 
                className="data-[state=active]:bg-[#46235C] data-[state=active]:text-white data-[state=active]:isolate bg-gray-100 dark:bg-gray-800"
              >
                Paste Text
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-0">
              {file ? (
                <div className="border-2 border-solid border-gray-200 rounded-xl p-10 min-h-[400px] flex flex-col items-center justify-center transition-all duration-200">
                  <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800/20 rounded-lg p-6 flex flex-col items-center">
                    <div className="flex items-center w-full mb-4">
                      {getFileTypeIcon(fileName)}
                      <div className="ml-3 flex-1 truncate">
                        <h3 className="font-medium text-lg">{fileName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {file.type.split('/')[1].toUpperCase()} • {Math.round(file.size / 1024)} KB
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex w-full justify-end gap-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs rounded-full" 
                        onClick={resetFileSelection}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Change file
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-xl p-10 min-h-[400px] flex items-center justify-center transition-all duration-200 ${
                    isDragging 
                      ? 'border-gray-400 bg-gray-50 dark:bg-gray-800/30' 
                      : 'border-gray-300 bg-transparent'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <FileText className="w-12 h-12 mb-4 text-gray-400" />
                    
                    <h3 className="text-lg font-medium mb-1">
                      Upload your CV
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-6">
                      Drag and drop your CV or click to browse
                    </p>
                    
                    <div>
                      <input
                        type="file"
                        id="cv-upload"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileInputChange}
                      />
                      <label htmlFor="cv-upload">
                        <Button 
                          variant="outline" 
                          className="cursor-pointer rounded-full px-6 font-medium border-gray-300 isolate hover:bg-[#46235C] hover:text-white hover:border-transparent" 
                          asChild
                        >
                          <span>Choose File</span>
                        </Button>
                      </label>
                    </div>

                    <p className="text-xs text-muted-foreground mt-4">
                      Supported formats: PDF, Word, TXT
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="paste" className="mt-0">
              <div className="space-y-4">
                <Textarea
                  value={cvText}
                  onChange={handleTextChange}
                  placeholder="Paste your CV content here..."
                  className="min-h-[400px] resize-none border-2 border-gray-300 p-4 focus:border-[#46235C] focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end my-6">
            <Button
              className="rounded-full px-6 py-2 bg-[#46235C] hover:bg-[#46235C]/80 active:bg-[#46235C]/60 text-white isolate transition-all duration-200"
              onClick={handleCVUpload}
              disabled={isAnalyzing || ((inputMethod === 'paste' && cvText.trim() === '') || (inputMethod === 'upload' && !file))}
            >
              Analyze CV
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CVUploadSection;
