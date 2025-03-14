
import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';

type RequireAuthProps = {
  children: ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated, setIsAuthModalOpen } = useAuth();

  if (!isAuthenticated) {
    // If not authenticated, open the auth modal
    setIsAuthModalOpen(true);
    // Return null or a placeholder
    return null;
  }

  // If authenticated, render the children
  return <>{children}</>;
};

export default RequireAuth;
