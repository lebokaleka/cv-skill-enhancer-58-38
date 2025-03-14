
import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import AuthTabs from './components/AuthTabs';

const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    selectedSubscription
  } = useAuth();

  // Determine initial tab based on selected subscription
  const initialTab = selectedSubscription ? 'sign-up' : 'sign-in';

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {initialTab === 'sign-up' ? 'Create an Account' : 'Welcome Back'}
          </DialogTitle>
          {selectedSubscription && initialTab === 'sign-up' && (
            <p className="text-center text-sm mt-2 text-primary font-medium">
              You've selected the {selectedSubscription.charAt(0).toUpperCase() + selectedSubscription.slice(1)} Plan
            </p>
          )}
        </DialogHeader>
        
        <AuthTabs initialTab={initialTab} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
