import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PlayCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const userCountRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const { isAuthenticated, setIsSubscriptionModalOpen } = useAuth();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimatedRef.current) {
        animateCount();
        hasAnimatedRef.current = true;
      }
    }, {
      threshold: 0.5
    });

    if (userCountRef.current) {
      observer.observe(userCountRef.current);
    }

    return () => {
      clearTimeout(timer);
      if (userCountRef.current) {
        observer.unobserve(userCountRef.current);
      }
    };
  }, []);

  const animateCount = () => {
    const target = 50000;
    const duration = 1500;
    const step = 30;
    let current = 0;
    const increment = target / (duration / step);
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        current = target;
      }
      setUserCount(Math.floor(current));
    }, step);
  };

  const handleFeatureClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="pt-32 pb-32 md:pt-40 md:pb-48 relative overflow-hidden bg-[#ECECEC]">
      <div className="absolute inset-0 z-0" />
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#ECECEC] to-transparent z-0" />
      
      <div className="app-container relative z-10">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="mb-8 leading-tight">
            Land Your Dream Job with
            <span className="text-primary text-[110%] md:text-[115%] lg:text-[120%] font-bold"> AI-Powered</span> Career Coaching
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Optimize your CV, prepare for interviews, and get personalized feedback to make your application stand out from the competition.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Button 
              size="lg" 
              className="px-8 py-7 text-lg bg-primary hover:bg-[#4A235A] transition-colors" 
              onClick={() => handleFeatureClick('/cv-analysis')}
            >
              Analyze My CV
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-7 text-lg border-primary text-primary hover:bg-primary/10" 
              onClick={() => navigate('/job-matching')}
            >
              <PlayCircle className="mr-2" size={20} />
              See How It Works
            </Button>
          </div>
          
          <div ref={userCountRef} className="mt-16 animate-fade-in">
            <p className="text-lg text-muted-foreground">
              Trusted by over <span className="text-primary text-3xl font-bold">{userCount.toLocaleString()}</span> job seekers worldwide to land their dream job.
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-16 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
