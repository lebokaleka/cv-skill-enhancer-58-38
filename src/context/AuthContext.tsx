
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SubscriptionTier } from '@/types/subscription';
import { clearCoverLetterData } from '@/utils/coverLetterStorage';

type User = {
  id: string;
  name: string;
  email: string;
  subscriptionTier?: SubscriptionTier;
} | null;

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  isSubscriptionModalOpen: boolean;
  selectedSubscription: SubscriptionTier | null;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  setIsSubscriptionModalOpen: (isOpen: boolean) => void;
  setSelectedSubscription: (tier: SubscriptionTier | null) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionTier | null>(null);

  // Mock authentication for now - we could replace this with actual auth implementation later
  const isAuthenticated = user !== null;

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Enhanced setUser function that also updates localStorage
  const setUser = (newUser: User) => {
    setUserState(newUser);
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
  };

  const logout = () => {
    // Clear cover letter data when user logs out
    clearCoverLetterData();
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAuthModalOpen,
      isSubscriptionModalOpen,
      selectedSubscription,
      setIsAuthModalOpen,
      setIsSubscriptionModalOpen,
      setSelectedSubscription,
      setUser,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
