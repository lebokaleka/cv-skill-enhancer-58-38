
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

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

  const handleForgotPassword = () => {
    const email = form.getValues('email');
    setForgotPasswordEmail(email);
    setIsEmailSent(true);
    console.log('Sending password reset to:', email);
  };

  const handleResendEmail = () => {
    console.log('Resending password reset to:', forgotPasswordEmail);
    // Simulating a resend with visual feedback
    setIsEmailSent(false);
    setTimeout(() => setIsEmailSent(true), 300);
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
          <Popover open={showForgotPassword} onOpenChange={setShowForgotPassword}>
            <PopoverTrigger asChild>
              <button 
                type="button"
                className="text-amber-600 hover:text-amber-700 font-medium hover:underline px-2 py-1 rounded-md hover:bg-amber-50 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setShowForgotPassword(true);
                  setIsEmailSent(false);
                }}
              >
                Forgot Password?
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 animate-fade-in">
              {!isEmailSent ? (
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Reset Your Password</h4>
                  <p className="text-sm text-muted-foreground">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  <div className="flex items-center border rounded-md focus-within:border-primary">
                    <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="your@email.com" 
                      className="border-0 focus-visible:ring-0"
                      value={form.getValues('email')} 
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                    />
                  </div>
                  <Button 
                    type="button" 
                    className="w-full"
                    onClick={handleForgotPassword}
                  >
                    Send Reset Link
                  </Button>
                </div>
              ) : (
                <Alert className="bg-amber-50 border-amber-200 animate-scale-in">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <AlertTitle className="text-amber-800">Check your inbox</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    <p className="mb-3">
                      We've sent a password reset link to:
                      <span className="font-medium block mt-1">{forgotPasswordEmail}</span>
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        className="text-xs border-amber-300 hover:bg-amber-100 text-amber-800"
                        onClick={handleResendEmail}
                      >
                        Resend Email
                      </Button>
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="text-xs text-amber-800 hover:bg-amber-100"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Close
                      </Button>
                    </div>
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
