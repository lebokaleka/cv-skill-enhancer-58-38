
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Calendar } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/types/subscription";
import { User } from "@/context/AuthContext";

interface SubscriptionPlansProps {
  user: User;
}

const SubscriptionPlans = ({ user }: SubscriptionPlansProps) => {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          Your current subscription plan and available options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrentPlan = user?.subscriptionTier === plan.id;
            const getPlanIcon = () => {
              switch (plan.id) {
                case 'free':
                  return <Star className="h-5 w-5 text-primary" />;
                case 'yearly':
                case 'monthly':
                  return <Calendar className="h-5 w-5 text-primary" />;
                default:
                  return <Calendar className="h-5 w-5 text-primary" />;
              }
            };
            
            return (
              <div 
                key={plan.id}
                className={`rounded-xl p-4 flex flex-col h-full relative ${
                  isCurrentPlan 
                    ? 'border-2 border-primary bg-primary/5' 
                    : 'border border-border'
                } ${plan.highlighted ? 'relative' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-0.5 rounded-full">
                      Popular Choice
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 mb-1">
                  {getPlanIcon()}
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                </div>
                
                <div className="mb-2">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm"> {plan.period}</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
                
                {plan.limit && (
                  <div className="bg-amber-50 text-amber-700 text-xs p-1.5 rounded-md mb-2">
                    {plan.limit}
                  </div>
                )}
                
                <ul className="space-y-1.5 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-sm">
                      <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {isCurrentPlan && (
                  <div className="mt-3 bg-primary/10 text-primary font-medium text-sm py-1.5 rounded-md text-center">
                    Selected
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlans;
