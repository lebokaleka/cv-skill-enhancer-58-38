import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CVUploader from "@/components/upload/CVUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  FileText, 
  Briefcase, 
  Lightbulb
} from 'lucide-react';

interface MatchResult {
  score: number;
  missingSkills: string[];
  presentSkills: string[];
  suggestions: string[];
  highlightedJob: string;
  highlightedCV: string;
}

const JobMatching = () => {
  const [cvText, setCvText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
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

  const handleAnalyze = () => {
    if (!cvText || !jobDescription) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock response data
      const mockResult: MatchResult = {
        score: 68,
        missingSkills: [
          "AWS",
          "Docker",
          "Kubernetes",
          "CI/CD pipeline experience"
        ],
        presentSkills: [
          "React",
          "TypeScript",
          "Node.js",
          "RESTful APIs",
          "JavaScript"
        ],
        suggestions: [
          "Highlight your experience with cloud services even if not specifically AWS",
          "Emphasize your containerization knowledge even if not Docker specifically",
          "Add more details about your CI/CD experience if applicable",
          "Consider adding a skills section that directly lists your technical competencies"
        ],
        highlightedJob: "We are looking for a <mark>Senior Frontend Developer</mark> with expertise in <mark>React</mark>, <mark>TypeScript</mark>, and <mark>JavaScript</mark>. Experience with <mark>AWS</mark>, <mark>Docker</mark>, and <mark>Kubernetes</mark> is required. The ideal candidate will have experience building <mark>RESTful APIs</mark> and working with <mark>CI/CD pipelines</mark>.",
        highlightedCV: "Experienced <mark>Frontend Developer</mark> with 5 years of expertise in <mark>React</mark>, <mark>TypeScript</mark>, and <mark>JavaScript</mark>. Skilled in building <mark>RESTful APIs</mark> with <mark>Node.js</mark> and Express. Experience working with Git and GitHub workflows."
      };

      setMatchResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="app-container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="mb-4">Job Description Matching</h1>
            <p className="text-muted-foreground text-lg">
              Compare your CV to a job description to identify gaps and optimize your application.
            </p>
          </div>

          {!matchResult && (
            <div className="space-y-6">
              {/* Tab Navigation similar to the image */}
              <div className="max-w-lg mx-auto mb-6">
                <div className="bg-secondary/20 p-1 rounded-full flex">
                  <button
                    className={`flex-1 py-2 rounded-full text-center transition-colors ${
                      activeTab === 'upload' 
                        ? 'bg-primary text-white' 
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('upload')}
                  >
                    Upload File
                  </button>
                  <button
                    className={`flex-1 py-2 rounded-full text-center transition-colors ${
                      activeTab === 'paste' 
                        ? 'bg-primary text-white' 
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                    onClick={() => setActiveTab('paste')}
                  >
                    Paste Text
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* CV Upload/Paste Section - Left Side */}
                <div className="space-y-6">
                  <Card className="glass-card border-dashed h-full animate-fade-in">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText size={20} />
                        <span>Your CV</span>
                      </CardTitle>
                      <CardDescription>
                        {activeTab === 'upload' ? 'Upload your CV file' : 'Paste your CV text'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {activeTab === 'upload' ? (
                        showUploader ? (
                          <CVUploader onUpload={handleCVUpload} />
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">CV Uploaded</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setShowUploader(true)}
                              >
                                Change
                              </Button>
                            </div>
                            <div className="bg-secondary/50 p-4 rounded-md h-[200px] overflow-auto">
                              <p className="text-sm whitespace-pre-wrap">{cvText}</p>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="space-y-4">
                          <Textarea
                            value={cvText}
                            onChange={(e) => setCvText(e.target.value)}
                            placeholder="Paste your CV content here..."
                            className="min-h-[200px] resize-none"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Job Description Section - Right Side */}
                <Card className="glass-card border-dashed h-full animate-fade-in" style={{ animationDelay: '150ms' }}>
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
                        className="min-h-[200px] resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Action Button - Analyze */}
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={!cvText || !jobDescription || isAnalyzing}
                  className="rounded-full"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Compare'}
                </Button>
              </div>
            </div>
          )}

          {matchResult && (
            <div className="space-y-8">
              {/* Match Score Overview */}
              <Card className="glass-card overflow-hidden animate-scale-in">
                <CardHeader className="border-b bg-secondary/40">
                  <CardTitle className="flex items-center justify-between">
                    <span>Match Score</span>
                    <span className={`text-2xl font-bold ${getScoreColor(matchResult.score)}`}>
                      {matchResult.score}%
                    </span>
                  </CardTitle>
                  <CardDescription>
                    How well your CV matches the job requirements
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Overall Compatibility</h3>
                      <Progress value={matchResult.score} className={getProgressColor(matchResult.score)} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                          <CheckCircle size={16} className="text-green-500" />
                          <span>Skills You Have</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {matchResult.presentSkills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                          <XCircle size={16} className="text-red-500" />
                          <span>Missing Skills</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {matchResult.missingSkills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Side by Side Comparison */}
              <Card className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: '150ms' }}>
                <CardHeader className="border-b bg-secondary/40">
                  <CardTitle>Document Comparison</CardTitle>
                  <CardDescription>
                    Side-by-side comparison with highlighted keywords
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Tabs defaultValue="sideBySide">
                    <TabsList className="mb-6 rounded-full">
                      <TabsTrigger value="sideBySide" className="rounded-full">Side by Side</TabsTrigger>
                      <TabsTrigger value="job" className="rounded-full">Job Description</TabsTrigger>
                      <TabsTrigger value="cv" className="rounded-full">Your CV</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="sideBySide" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium mb-3">Job Description</h3>
                          <div className="bg-secondary/50 p-4 rounded-md max-h-64 overflow-auto">
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: matchResult.highlightedJob }}></p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-3">Your CV</h3>
                          <div className="bg-secondary/50 p-4 rounded-md max-h-64 overflow-auto">
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: matchResult.highlightedCV }}></p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="job" className="mt-0">
                      <div className="bg-secondary/50 p-4 rounded-md max-h-96 overflow-auto">
                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: matchResult.highlightedJob }}></p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="cv" className="mt-0">
                      <div className="bg-secondary/50 p-4 rounded-md max-h-96 overflow-auto">
                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: matchResult.highlightedCV }}></p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Suggestions */}
              <Card className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardHeader className="border-b bg-secondary/40">
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb size={20} className="text-amber-500" />
                    <span>Improvement Suggestions</span>
                  </CardTitle>
                  <CardDescription>
                    Tailored recommendations to improve your match score
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    {matchResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex gap-3 items-start p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10">
                        <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                        <p>{suggestion}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end animate-fade-in" style={{ animationDelay: '450ms' }}>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setMatchResult(null);
                    setJobDescription('');
                  }}
                  className="rounded-full"
                >
                  New Comparison
                </Button>
                <Button 
                  onClick={() => window.location.href = '/cover-letter'}
                  className="rounded-full"
                >
                  Generate Cover Letter
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobMatching;
