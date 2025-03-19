
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

interface ForgotPasswordLinkProps {
  getEmail: () => string;
}

const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({ getEmail }) => {
  const { toast } = useToast();

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = getEmail();
    
    toast({
      title: "Password Reset Email Sent",
      description: (
        <Alert className="bg-amber-50 border border-amber-200 text-amber-800 animate-fade-in">
          <CheckCircle className="h-4 w-4 mr-2 inline-block text-amber-600" />
          <AlertDescription className="text-amber-800">
            Instructions have been sent to {email || "your email"}. Please check your inbox.
          </AlertDescription>
        </Alert>
      ),
      duration: 5000,
    });
  };

  return (
    <div className="text-sm text-right">
      <a 
        href="#" 
        className="text-primary hover:underline" 
        onClick={handleForgotPassword}
      >
        Forgot Password?
      </a>
    </div>
  );
};

export default ForgotPasswordLink;
