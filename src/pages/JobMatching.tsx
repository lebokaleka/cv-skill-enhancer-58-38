
import { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MatchResult } from '@/types/jobMatching';
import JobMatchingForm from '@/components/job-matching/JobMatchingForm';
import { Button } from "@/components/ui/button";

const JobMatching = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  const handleAnalyze = (cvText: string, jobDescription: string) => {
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

  const handleNewComparison = () => {
    setMatchResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="app-container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Job Description Matching</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare your CV to a job description to identify gaps and optimize your application.
            </p>
          </div>

          <div className="animate-scale-in">
            <JobMatchingForm 
              onAnalyze={handleAnalyze} 
              isAnalyzing={isAnalyzing}
              matchResult={matchResult} 
            />
          </div>

          {matchResult && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleNewComparison}
                className="rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              >
                Start New Comparison
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobMatching;
