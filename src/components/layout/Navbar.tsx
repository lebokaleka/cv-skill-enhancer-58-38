
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, UserCog } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { 
    isAuthenticated, 
    user, 
    logout, 
    setIsAuthModalOpen, 
    setIsSubscriptionModalOpen 
  } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/cv-analysis', label: 'CV Analysis' },
    { path: '/cover-letter', label: 'Cover Letter' },
    { path: '/job-matching', label: 'Job Matching' },
    { path: '/interview', label: 'Interview Coach' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setIsSubscriptionModalOpen(true);
    }
  };

  const handleLogout = () => {
    document.dispatchEvent(new Event('logout'));
    logout();
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="app-container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={handleNavClick}>
          <span className="font-bold text-xl tracking-tight">CVCoach</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={handleNavClick}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path 
                  ? 'text-primary' 
                  : 'text-foreground/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative flex items-center gap-2 px-3 py-2 rounded-full h-auto min-w-[120px] ml-2 bg-[#46235C] text-white hover:bg-[#46235C]/90"
                >
                  <span className="text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    {user?.subscriptionTier && (
                      <p className="text-xs text-primary font-medium">
                        {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} Plan
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center cursor-pointer"
                  onClick={() => window.open('/edit-profile', '_self')}
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" className="ml-2" onClick={handleGetStarted}>
              Get Started
            </Button>
          )}
        </nav>

        <button
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileMenuOpen && (
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
            
            {isAuthenticated ? (
              <div className="px-4 py-2 flex flex-col space-y-2">
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
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
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
