
import { Link, useLocation } from 'react-router-dom';
import { LogOut, UserCog } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { NavLink } from './NavLink';

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: Array<{ path: string; label: string }>;
  handleNavClick: () => void;
}

const MobileMenu = ({ isOpen, navLinks, handleNavClick }: MobileMenuProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    document.dispatchEvent(new Event('logout'));
    logout();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-down">
      <nav className="app-container py-4 flex flex-col space-y-3">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={handleNavClick}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === link.path 
                ? 'bg-secondary text-primary' 
                : 'text-foreground/80 hover:bg-secondary/50'
            }`}
          >
            {link.label}
          </Link>
        ))}
        
        {user ? (
          <div className="px-4 py-2 flex flex-col space-y-2">
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <Link
              to="/edit-profile"
              className="text-sm flex items-center py-2 text-foreground/80 hover:text-primary"
            >
              <UserCog className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
            <Button 
              variant="ghost" 
              size="sm"
              className="justify-start px-0"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </Button>
          </div>
        ) : (
          <Button 
            size="sm" 
            className="mt-2 w-full"
            onClick={() => {
              const { setIsSubscriptionModalOpen } = useAuth();
              setIsSubscriptionModalOpen(true);
            }}
          >
            Get Started
          </Button>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
