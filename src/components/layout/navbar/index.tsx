
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="app-container flex items-center justify-between">
        <Logo onClick={handleNavClick} />

        <DesktopNav 
          navLinks={navLinks} 
          handleNavClick={handleNavClick} 
        />

        <button
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        navLinks={navLinks} 
        handleNavClick={handleNavClick} 
      />
    </header>
  );
};

export default Navbar;
