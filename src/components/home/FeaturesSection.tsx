
import { useNavigate } from 'react-router-dom';
import FeatureCard from "@/components/ui/FeatureCard";
import { FileText, FileSearch, FileEdit, Mic } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const FeaturesSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsSubscriptionModalOpen } = useAuth();

  const handleFeatureClick = (path: string) => {
    if (!isAuthenticated) {
      setIsSubscriptionModalOpen(true);
    } else {
      navigate(path);
    }
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

  return (
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
              onClick={() => handleFeatureClick(feature.path)}
              className="cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
