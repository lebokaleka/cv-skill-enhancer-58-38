
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/context/AuthContext';
import AuthTabs from './components/AuthTabs';

const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    selectedSubscription
  } = useAuth();

  // Determine initial tab based on selected subscription
  // If there's a selectedSubscription, show sign-up tab, otherwise show sign-in tab
  const initialTab = selectedSubscription ? 'sign-up' : 'sign-in';

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
      <DialogContent className="sm:max-w-[425px] animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            {initialTab === 'sign-up' ? 'Create an Account' : 'Welcome Back'}
          </DialogTitle>
          <DialogDescription className="text-center">
            {selectedSubscription && initialTab === 'sign-up' ? (
              <p className="text-sm mt-2 text-primary font-medium">
                You've selected the {selectedSubscription.charAt(0).toUpperCase() + selectedSubscription.slice(1)} Plan
              </p>
            ) : (
              'Sign in to your account to continue'
            )}
          </DialogDescription>
        </DialogHeader>
        
        <AuthTabs initialTab={initialTab} />
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
