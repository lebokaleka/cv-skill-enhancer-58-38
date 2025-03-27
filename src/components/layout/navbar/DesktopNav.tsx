
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { NavLink } from './NavLink';
import UserDropdown from './UserDropdown';

interface DesktopNavProps {
  navLinks: Array<{ path: string; label: string }>;
  handleNavClick: () => void;
}

const DesktopNav = ({ navLinks, handleNavClick }: DesktopNavProps) => {
  const location = useLocation();
  const { isAuthenticated, setIsSubscriptionModalOpen } = useAuth();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setIsSubscriptionModalOpen(true);
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-6">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          active={location.pathname === link.path}
          onClick={handleNavClick}
        >
          {link.label}
        </NavLink>
      ))}
      
      {isAuthenticated ? (
        <UserDropdown />
      ) : (
        <Button size="sm" className="ml-2" onClick={handleGetStarted}>
          Get Started
        </Button>
      )}
    </nav>
  );
};

export default DesktopNav;
