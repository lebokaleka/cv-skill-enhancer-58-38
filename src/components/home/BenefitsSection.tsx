
import { BarChart, Award, Zap, MessageSquare } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <BarChart size={25} className="text-primary" />,
      title: "Increase interview success",
      description: "Our users see a 3x higher callback rate from recruiters after optimizing with our platform."
    },
    {
      icon: <Award size={25} className="text-primary" />,
      title: "Industry-specific insights",
      description: "Receive tailored advice based on your industry, experience level, and career goals."
    },
    {
      icon: <Zap size={25} className="text-primary" />,
      title: "Faster application process",
      description: "Save hours on job applications with AI-powered workflows to refine your materials."
    },
    {
      icon: <MessageSquare size={25} className="text-primary" />,
      title: "Confidence building",
      description: "Build confidence through practice and feedback before your real interviews."
    }
  ];

  return (
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
  );
};

export default BenefitsSection;
