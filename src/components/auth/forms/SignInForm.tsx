
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
import { useState } from 'react';

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
  const { setUser } = useAuth();
  const { toast } = useToast();
  const [showPasswordResetAlert, setShowPasswordResetAlert] = useState(false);

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
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPasswordResetAlert(true);
    
    // Auto-hide the alert after 5 seconds
    setTimeout(() => {
      setShowPasswordResetAlert(false);
    }, 5000);
  };

  return (
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
        
        {showPasswordResetAlert && (
          <Alert className="bg-amber-50 border border-amber-200 text-amber-800 animate-in fade-in duration-300">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 mr-2 text-amber-600 flex-shrink-0 mt-0.5" />
              <AlertDescription className="text-amber-800">
                Password reset instructions have been sent to {form.getValues("email") || "your email"}. Please check your inbox.
              </AlertDescription>
            </div>
          </Alert>
        )}
        
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
  );
};

export default SignInForm;
