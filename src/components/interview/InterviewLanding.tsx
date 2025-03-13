
import { BrainCircuit, Upload } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface InterviewLandingProps {
  onSelectInterviewType: (type: 'general' | 'narrowed') => void;
}

const InterviewLanding = ({ onSelectInterviewType }: InterviewLandingProps) => {
  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      <div className="max-w-3xl">
        <h2 className="mb-4">Interview Coach</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Practice your interview skills with our AI-powered Interview Coach. 
          Get feedback on your responses and improve your performance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card 
            className="hover:shadow-md transition-shadow cursor-pointer" 
            onClick={() => onSelectInterviewType('general')}
          >
            <CardHeader>
              <CardTitle>General Interview</CardTitle>
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
              <Button className="w-full">Select General Interview</Button>
            </CardFooter>
          </Card>
          
          <Card 
            className="hover:shadow-md transition-shadow cursor-pointer" 
            onClick={() => onSelectInterviewType('narrowed')}
          >
            <CardHeader>
              <CardTitle>Job-Specific Interview</CardTitle>
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
              <Button className="w-full">Select Job-Specific Interview</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewLanding;
