
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface CoverLetterLayoutProps {
  children: React.ReactNode;
}

const CoverLetterLayout: React.FC<CoverLetterLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="app-container">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Cover Letter Generator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Create a tailored cover letter based on your CV and the job description.
            </p>
          </div>
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoverLetterLayout;
