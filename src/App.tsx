
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CVAnalysis from "./pages/CVAnalysis";
import JobMatching from "./pages/JobMatching";
import CoverLetter from "./pages/CoverLetter";
import Interview from "./pages/Interview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cv-scoring" element={<CVAnalysis />} />
          <Route path="/cv-analysis" element={<CVAnalysis />} />
          <Route path="/job-matching" element={<JobMatching />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/interview" element={<Interview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
