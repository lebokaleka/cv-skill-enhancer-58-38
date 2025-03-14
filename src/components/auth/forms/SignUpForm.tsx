
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
        <FormField 
          control={form.control} 
          name="name" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md focus-within:border-primary">
                  <User className="ml-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="John Doe" className="border-0 focus-visible:ring-0" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        
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
                  <Input type="password" placeholder="Create a password" className="border-0 focus-visible:ring-0" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        
        <FormField 
          control={form.control} 
          name="confirmPassword" 
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="flex items-center border rounded-md focus-within:border-primary">
                  <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                  <Input type="password" placeholder="Confirm your password" className="border-0 focus-visible:ring-0" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
        
        <Button type="submit" className="w-full">Create Account</Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
