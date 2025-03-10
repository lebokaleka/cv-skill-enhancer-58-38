
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/ui/FeatureCard";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { 
  FileText, 
  FileSearch, 
  FileEdit, 
  Mic, 
  MessageSquare,
  BarChart,
  Award,
  Zap,
  PlayCircle
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const userCountRef = useRef(null);
  
  useEffect(() => {
    // Add a slight delay for the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Intersection Observer for counting animation
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        animateCount();
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
    // Changed duration from 1000ms to 1500ms as requested
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

  const features = [
    {
      icon: <FileText size={20} />,
      title: "CV Analysis",
      description: "Get your resume evaluated with specific actionable suggestions for improvement.",
      path: "/cv-analysis"
    },
    {
      icon: <FileSearch size={20} />,
      title: "Job Matching",
      description: "Compare your CV to job descriptions and identify missing skills or keywords.",
      path: "/job-matching"
    },
    {
      icon: <FileEdit size={20} />,
      title: "Cover Letter Generator",
      description: "Create tailored cover letters from your CV and target job descriptions.",
      path: "/cover-letter"
    },
    {
      icon: <Mic size={20} />,
      title: "Interview Coach",
      description: "Practice with AI-powered mock interviews and receive instant feedback.",
      path: "/interview"
    }
  ];

  const benefits = [
    {
      icon: <BarChart size={25} className="text-primary" />, // Increased size by 25%
      title: "Increase interview success",
      description: "Our users see a 3x higher callback rate from recruiters after optimizing with our platform."
    },
    {
      icon: <Award size={25} className="text-primary" />, // Increased size by 25%
      title: "Industry-specific insights",
      description: "Receive tailored advice based on your industry, experience level, and career goals."
    },
    {
      icon: <Zap size={25} className="text-primary" />, // Increased size by 25%
      title: "Faster application process",
      description: "Save hours on job applications with AI-powered workflows to refine your materials."
    },
    {
      icon: <MessageSquare size={25} className="text-primary" />, // Increased size by 25%
      title: "Confidence building",
      description: "Build confidence through practice and feedback before your real interviews."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
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
                onClick={() => navigate('/cv-analysis')}
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
      
      {/* Features Section */}
      <section className="py-16 md:py-24 relative">
        <div className="app-container">
          <div className="text-center mb-16">
            <h2 className="mb-4">Optimize Every Step of Your Job Search</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI tools help you perfect your application materials and interview skills to maximize your chances of success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                onClick={() => navigate(feature.path)}
                className="cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-[#ECECEC] relative">
        <div className="app-container">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Choose Our Platform</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've helped thousands of job seekers land their dream roles with our AI-powered tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex gap-4 animate-fade-in group p-4 rounded-lg transition-all duration-300 hover:bg-white/50" 
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="rounded-full p-3 w-14 h-14 flex items-center justify-center bg-primary/10 text-primary shrink-0 transition-all duration-300 group-hover:bg-primary/20">
                  {benefit.icon}
                </div>
                <div className="transition-all duration-300">
                  <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors duration-300">{benefit.title}</h3>
                  <p className="text-muted-foreground group-hover:translate-x-1 transition-transform duration-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 relative bg-background">
        <div className="absolute inset-0 z-0" />
        
        <div className="app-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">Ready to Transform Your Job Search?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have accelerated their careers with our AI-powered tools.
            </p>
            <Button size="lg" className="px-10 py-6 text-md animate-scale-in" onClick={() => navigate('/cv-analysis')}>
              Get Started for Free
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
