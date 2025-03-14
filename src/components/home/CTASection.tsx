
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const CTASection = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsSubscriptionModalOpen } = useAuth();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setIsSubscriptionModalOpen(true);
    } else {
      navigate('/cv-analysis');
    }
  };

  return (
    <section className="py-20 md:py-32 relative bg-background">
      <div className="absolute inset-0 z-0" />
      
      <div className="app-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-6">Ready to Transform Your Job Search?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their careers with our AI-powered tools.
          </p>
          <Button 
            size="lg" 
            className="px-10 py-6 text-md animate-scale-in" 
            onClick={handleGetStarted}
          >
            Get Started for Free
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
