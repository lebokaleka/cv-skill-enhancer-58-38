
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface SubscriptionPlanProps {
  user: {
    subscriptionTier?: string;
  };
}

const SubscriptionPlan = ({ user }: SubscriptionPlanProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          Your current subscription details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border p-3">
          <div className="font-medium">
            {user?.subscriptionTier 
              ? `${user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} Plan` 
              : "Free Plan"}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {user?.subscriptionTier === "free" && "Limited features access"}
            {user?.subscriptionTier === "weekly" && "Renews weekly - Full access"}
            {user?.subscriptionTier === "monthly" && "Renews monthly - Full access"}
            {user?.subscriptionTier === "yearly" && "Renews yearly - Full access + Bonus features"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlan;
