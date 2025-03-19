
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import FormInputWithIcon from '../components/FormInputWithIcon';
import GoogleAuthButton from '../components/GoogleAuthButton';
import AuthDivider from '../components/AuthDivider';

const signUpSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters'
  }),
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters'
  }),
  confirmPassword: z.string().min(8, {
    message: 'Please confirm your password'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const { setUser, selectedSubscription, setIsAuthModalOpen } = useAuth();
  const { toast } = useToast();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleSignUp = (values: SignUpFormValues) => {
    console.log('Sign up values:', values);

    setUser({
      id: Math.random().toString(36).substring(2, 9),
      name: values.name,
      email: values.email,
      subscriptionTier: selectedSubscription || 'free'
    });

    toast({
      title: "Account created!",
      description: `You have successfully signed up for CVCoach with a ${selectedSubscription || 'free'} plan.`
    });
    
    setIsAuthModalOpen(false);
    
    if (selectedSubscription && selectedSubscription !== 'free') {
      toast({
        title: "Payment Required",
        description: "You would now be redirected to complete payment for your subscription.",
        variant: "default"
      });
    }
  };

  const handleGoogleSignUp = () => {
    console.log('Sign up with Google');
    
    // Mock Google sign-up
    setUser({
      id: Math.random().toString(36).substring(2, 9),
      name: 'Google User',
      email: 'google.user@example.com',
      subscriptionTier: selectedSubscription || 'free'
    });
    
    toast({
      title: "Google Sign-up Successful",
      description: `You have successfully signed up for CVCoach with a ${selectedSubscription || 'free'} plan.`
    });
    
    setIsAuthModalOpen(false);
    
    if (selectedSubscription && selectedSubscription !== 'free') {
      toast({
        title: "Payment Required",
        description: "You would now be redirected to complete payment for your subscription.",
        variant: "default"
      });
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
          <FormInputWithIcon
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            icon={User}
          />
          
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
            placeholder="Create a password"
            type="password"
            icon={Lock}
          />
          
          <FormInputWithIcon
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            icon={Lock}
          />
          
          <Button type="submit" className="w-full">Create Account</Button>
        </form>
      </Form>
      
      <AuthDivider />
      
      <GoogleAuthButton 
        onClick={handleGoogleSignUp} 
        label="Continue with Google" 
      />
    </div>
  );
};

export default SignUpForm;
