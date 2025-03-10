
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/cv-analysis', label: 'CV Analysis' },
    { path: '/job-matching', label: 'Job Matching' },
    { path: '/cover-letter', label: 'Cover Letter' },
    { path: '/interview', label: 'Interview Coach' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="app-container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl tracking-tight">CVCoach</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path 
                  ? 'text-primary' 
                  : 'text-foreground/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button size="sm" className="ml-2">
            Get Started
          </Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-down">
          <nav className="app-container py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'bg-secondary text-primary' 
                    : 'text-foreground/80 hover:bg-secondary/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" className="mt-2 w-full">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
