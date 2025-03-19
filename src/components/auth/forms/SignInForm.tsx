
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FormInputWithIcon from '../components/FormInputWithIcon';
import GoogleAuthButton from '../components/GoogleAuthButton';
import AuthDivider from '../components/AuthDivider';

const signInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  password: z.string().min(1, {
    message: 'Please enter your password'
  })
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const { setUser, setIsAuthModalOpen } = useAuth();
  const { toast } = useToast();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleSignIn = (values: SignInFormValues) => {
    console.log('Sign in values:', values);

    setUser({
      id: Math.random().toString(36).substring(2, 9),
      name: 'Test User',
      email: values.email,
      subscriptionTier: 'free'
    });
    
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in to CVCoach."
    });

    // Close the auth modal after successful sign-in
    setIsAuthModalOpen(false);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = form.getValues("email");
    
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

  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
    
    // Mock Google sign-in
    setUser({
      id: Math.random().toString(36).substring(2, 9),
      name: 'Google User',
      email: 'google.user@example.com',
      subscriptionTier: 'free'
    });
    
    toast({
      title: "Google Sign-in Successful",
      description: "You have successfully signed in with Google."
    });
    
    setIsAuthModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignIn)} className="space-y-4">
          <FormInputWithIcon 
            control={form.control} 
            name="email" 
            label="Email"
            placeholder="your@email.com"
            icon={Mail}
          />
          
          <FormInputWithIcon 
            control={form.control} 
            name="password" 
            label="Password"
            placeholder="Your password"
            type="password"
            icon={Lock}
          />
          
          <div className="text-sm text-right">
            <a 
              href="#" 
              className="text-primary hover:underline" 
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </a>
          </div>
          
          <Button type="submit" className="w-full">Sign In</Button>
        </form>
      </Form>
      
      <AuthDivider />
      
      <GoogleAuthButton 
        onClick={handleGoogleSignIn} 
        label="Continue with Google" 
      />
    </div>
  );
};

export default SignInForm;
