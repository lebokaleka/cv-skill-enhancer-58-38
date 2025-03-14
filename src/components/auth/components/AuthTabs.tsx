
import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';
import { useAuth } from '@/context/AuthContext';

interface AuthTabsProps {
  initialTab?: string;
}

const AuthTabs = ({ initialTab = 'sign-in' }: AuthTabsProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { selectedSubscription } = useAuth();
  
  useEffect(() => {
    if (selectedSubscription) {
      setActiveTab('sign-up');
    }
  }, [selectedSubscription]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="sign-in">Sign In</TabsTrigger>
        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="sign-in" className="mt-4 space-y-4">
        <SignInForm />
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="sign-up" className="mt-4 space-y-4">
        <SignUpForm />
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
