import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, User, LogIn } from 'lucide-react';
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
const signInSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address'
  }),
  password: z.string().min(1, {
    message: 'Please enter your password'
  })
});
type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignInFormValues = z.infer<typeof signInSchema>;
const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    setUser
  } = useAuth();
  const [activeTab, setActiveTab] = useState('sign-in');
  const {
    toast
  } = useToast();
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const handleSignUp = (values: SignUpFormValues) => {
    // Mock signup - would integrate with actual auth service
    console.log('Sign up values:', values);

    // Create mock user
    setUser({
      id: Math.random().toString(36).substring(2, 9),
      name: values.name,
      email: values.email
    });
    toast({
      title: "Account created!",
      description: "You have successfully signed up for CVCoach."
    });
    setIsAuthModalOpen(false);
  };
  const handleSignIn = (values: SignInFormValues) => {
    // Mock login - would integrate with actual auth service
    console.log('Sign in values:', values);

    // Create mock user
    setUser({
      id: Math.random().toString(36).substring(2, 9),
      name: 'Test User',
      email: values.email
    });
    toast({
      title: "Welcome back!",
      description: "You have successfully signed in to CVCoach."
    });
    setIsAuthModalOpen(false);
  };
  const handleGoogleAuth = () => {
    // Mock Google auth - would integrate with actual auth service
    console.log('Signing in with Google');

    // Create mock user
    setUser({
      id: Math.random().toString(36).substring(2, 9),
      name: 'Google User',
      email: 'google-user@example.com'
    });
    toast({
      title: "Welcome via Google!",
      description: "You have successfully signed in with Google."
    });
    setIsAuthModalOpen(false);
  };
  return <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {activeTab === 'sign-up' ? 'Create an Account' : 'Welcome Back'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          
          {/* Sign In Tab */}
          <TabsContent value="sign-in" className="mt-4 space-y-4">
            <Form {...signInForm}>
              <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                <FormField control={signInForm.control} name="email" render={({
                field
              }) => <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:border-primary">
                          <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="your@email.com" className="border-0 focus-visible:ring-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={signInForm.control} name="password" render={({
                field
              }) => <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:border-primary">
                          <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input type="password" placeholder="Your password" className="border-0 focus-visible:ring-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <div className="text-sm text-right">
                  <a href="#" className="text-primary hover:underline" onClick={e => {
                  e.preventDefault();
                  toast({
                    title: "Password Reset",
                    description: "Instructions sent! Check your email."
                  });
                }}>
                    Forgot Password?
                  </a>
                </div>
                
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
            </Form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              
            </div>
            
            
          </TabsContent>
          
          {/* Sign Up Tab */}
          <TabsContent value="sign-up" className="mt-4 space-y-4">
            <Form {...signUpForm}>
              <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                <FormField control={signUpForm.control} name="name" render={({
                field
              }) => <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:border-primary">
                          <User className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="John Doe" className="border-0 focus-visible:ring-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={signUpForm.control} name="email" render={({
                field
              }) => <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:border-primary">
                          <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="your@email.com" className="border-0 focus-visible:ring-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={signUpForm.control} name="password" render={({
                field
              }) => <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:border-primary">
                          <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input type="password" placeholder="Create a password" className="border-0 focus-visible:ring-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <FormField control={signUpForm.control} name="confirmPassword" render={({
                field
              }) => <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:border-primary">
                          <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input type="password" placeholder="Confirm your password" className="border-0 focus-visible:ring-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
                
                <Button type="submit" className="w-full">Create Account</Button>
              </form>
            </Form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              
            </div>
            
            
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>;
};
export default AuthModal;