
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SubscriptionTier } from '@/types/subscription';

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
  const [user, setUser] = useState<User>(null);
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
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Store user in localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    // Trigger the logout event before clearing user data
    document.dispatchEvent(new Event('logout'));
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
