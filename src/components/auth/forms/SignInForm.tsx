
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showForgotPasswordAlert, setShowForgotPasswordAlert] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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
    
    const email = form.getValues("email");
    setForgotPasswordEmail(email || "your email");
    
    // Show confirmation alert
    setShowForgotPasswordAlert(true);
    setIsPopoverOpen(true);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowForgotPasswordAlert(false);
      setIsPopoverOpen(false);
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
        
        <div className="text-sm text-right">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <button 
                onClick={handleForgotPassword}
                className="text-primary hover:underline focus:outline-none"
              >
                Forgot Password?
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 animate-fade-in">
              {showForgotPasswordAlert && (
                <Alert className="border-0 bg-amber-50">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-amber-800 font-medium">
                    Password Reset Instructions Sent
                  </AlertTitle>
                  <AlertDescription className="text-amber-700">
                    We've sent recovery instructions to {forgotPasswordEmail}. 
                    Please check your inbox and spam folder.
                  </AlertDescription>
                </Alert>
              )}
            </PopoverContent>
          </Popover>
        </div>
        
        <Button type="submit" className="w-full">Sign In</Button>
      </form>
    </Form>
  );
};

export default SignInForm;
