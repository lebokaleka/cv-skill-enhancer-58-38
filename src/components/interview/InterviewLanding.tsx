
import { BrainCircuit, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InterviewLandingProps {
  onSelectInterviewType: (type: 'general' | 'narrowed') => void;
}

const InterviewLanding = ({ onSelectInterviewType }: InterviewLandingProps) => {
  return (
    <div className="animate-fade-in">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Interview Coach</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Practice your interview skills with our AI-powered Interview Coach. 
          Get feedback on your responses and improve your performance.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-scale-in">
        <Card 
          className="glass-card border-dashed border hover:shadow-md transition-shadow cursor-pointer" 
          onClick={() => onSelectInterviewType('general')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit size={20} />
              <span>General Interview</span>
            </CardTitle>
            <CardDescription>
              Practice common interview questions that apply to most job positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <BrainCircuit size={64} className="text-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-full">Select General Interview</Button>
          </CardFooter>
        </Card>
        
        <Card 
          className="glass-card border-dashed border hover:shadow-md transition-shadow cursor-pointer" 
          onClick={() => onSelectInterviewType('narrowed')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              <span>Job-Specific Interview</span>
            </CardTitle>
            <CardDescription>
              Customize the interview based on a specific job position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Upload size={64} className="text-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full rounded-full">Select Job-Specific Interview</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default InterviewLanding;
