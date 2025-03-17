
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Award, Calendar, Star, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { SubscriptionTier, SUBSCRIPTION_PLANS } from '@/types/subscription';

const SubscriptionModal = () => {
  const { 
    isSubscriptionModalOpen, 
    setIsSubscriptionModalOpen, 
    setIsAuthModalOpen,
    selectedSubscription,
    setSelectedSubscription 
  } = useAuth();
  
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier>(
    selectedSubscription || 'free'
  );

  const handleSelectPlan = (planId: SubscriptionTier) => {
    setSelectedPlan(planId);
  };

  const handleConfirm = () => {
    setSelectedSubscription(selectedPlan);
    setIsSubscriptionModalOpen(false);
    setIsAuthModalOpen(true);
  };

  const handleLogin = () => {
    setIsSubscriptionModalOpen(false);
    setIsAuthModalOpen(true);
  };

  const getPlanIcon = (planId: SubscriptionTier) => {
    switch (planId) {
      case 'free':
        return <Star className="h-5 w-5 text-primary" />;
      case 'weekly':
        return <Award className="h-5 w-5 text-primary" />; 
      case 'monthly':
      case 'yearly':
        return <Calendar className="h-5 w-5 text-primary" />;
      default:
        return <Star className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Dialog open={isSubscriptionModalOpen} onOpenChange={setIsSubscriptionModalOpen}>
      <DialogContent className="sm:max-w-[95%] md:max-w-[90%] lg:max-w-[1200px] max-h-[90vh] overflow-y-auto p-6 animate-scale-in">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Choose Your Plan
          </DialogTitle>
          <p className="text-center text-muted-foreground mt-2">
            Select a subscription plan to access our AI-powered career tools
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={`rounded-xl p-5 flex flex-col h-full relative cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.id 
                  ? 'border-2 border-primary bg-primary/5 shadow-lg' 
                  : 'border border-border hover:border-primary/50 hover:shadow'
              } ${plan.highlighted ? 'md:scale-105' : ''}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Popular Choice
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2 mb-2">
                {getPlanIcon(plan.id)}
                <h3 className="font-semibold text-lg">{plan.name}</h3>
              </div>
              
              <div className="mb-4">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground"> {plan.period}</span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
              
              {plan.limit && (
                <div className="bg-amber-50 text-amber-700 text-xs p-2 rounded-md mb-4">
                  {plan.limit}
                </div>
              )}
              
              <ul className="space-y-2 mb-4 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={selectedPlan === plan.id ? "default" : "outline"}
                className="mt-2 w-full"
                onClick={() => handleSelectPlan(plan.id)}
              >
                {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center mt-6">
          <Button size="lg" onClick={handleConfirm} className="px-8">
            Continue with {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
          </Button>
          
          <div className="mt-4">
            <Button 
              variant="ghost" 
              onClick={handleLogin}
              className="text-primary hover:text-primary/80 flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Already have an account? Log in
            </Button>
          </div>
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          You can change your plan at any time after signup
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionModal;
