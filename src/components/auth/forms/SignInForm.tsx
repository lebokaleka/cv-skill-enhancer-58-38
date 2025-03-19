
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

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
          <FormField 
            control={form.control} 
            name="email" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md focus-within:border-primary">
                    <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="your@email.com" className="border-0 focus-visible:ring-0" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
          />
          
          <FormField 
            control={form.control} 
            name="password" 
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="flex items-center border rounded-md focus-within:border-primary">
                    <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input type="password" placeholder="Your password" className="border-0 focus-visible:ring-0" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} 
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
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2" 
        onClick={handleGoogleSignIn}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
          </g>
        </svg>
        Continue with Google
      </Button>
    </div>
  );
};

export default SignInForm;
