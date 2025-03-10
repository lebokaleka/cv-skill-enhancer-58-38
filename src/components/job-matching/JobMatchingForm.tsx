
import { useState } from 'react';
import CVUploader from "@/components/upload/CVUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Briefcase, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JobMatchingFormProps {
  onAnalyze: (cvText: string, jobDescription: string) => void;
  isAnalyzing: boolean;
}

const JobMatchingForm = ({ onAnalyze, isAnalyzing }: JobMatchingFormProps) => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [showUploader, setShowUploader] = useState(true);
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');

  const handleCVUpload = (text: string) => {
    setCvText(text);
    if (text) {
      setShowUploader(false);
    }
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleAnalyzeClick = () => {
    if (!cvText || !jobDescription) return;
    onAnalyze(cvText, jobDescription);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CV Upload/Paste Section - Left Side */}
        <Card className="glass-card border-dashed animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} />
              <span>Your CV</span>
            </CardTitle>
            <CardDescription>
              Upload your CV file
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="upload" onValueChange={(value) => setActiveTab(value as 'upload' | 'paste')}>
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-purple-100 dark:bg-purple-900/30">
                <TabsTrigger value="upload" className="rounded-full data-[state=active]:bg-[#46235C] data-[state=active]:text-white data-[state=active]:isolate bg-purple-200 dark:bg-purple-800/50 text-purple-800 dark:text-purple-200">Upload File</TabsTrigger>
                <TabsTrigger value="paste" className="rounded-full data-[state=active]:bg-[#46235C] data-[state=active]:text-white data-[state=active]:isolate bg-purple-200 dark:bg-purple-800/50 text-purple-800 dark:text-purple-200">Paste Text</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="space-y-4">
                {showUploader ? (
                  <CVUploader onUpload={handleCVUpload} />
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CV Uploaded</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowUploader(true)}
                        className="isolate hover:bg-[#46235C] hover:text-white"
                      >
                        Change
                      </Button>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-md h-[200px] overflow-auto">
                      <p className="text-sm whitespace-pre-wrap">{cvText}</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="paste" className="space-y-4">
                <Textarea
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Or paste your CV content here..."
                  className="min-h-[250px] resize-none"
                />
              </TabsContent>
            </Tabs>

            {/* Analyze Button - Inside the CV Card at the bottom */}
            <div className="flex justify-end mt-4">
              <Button
                onClick={handleAnalyzeClick}
                disabled={!cvText || !jobDescription || isAnalyzing}
                className="rounded-full bg-[#46235C] hover:bg-[#46235C]/90 text-white isolate"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze CV'}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Description Section - Right Side */}
        <Card className="glass-card border-dashed animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase size={20} />
              <span>Job Description</span>
            </CardTitle>
            <CardDescription>
              Paste the job description you want to apply for
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                placeholder="Paste job description here..."
                className="min-h-[250px] resize-none"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatchingForm;
