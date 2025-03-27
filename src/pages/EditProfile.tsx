
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Shield, UserCog, Check, Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { SUBSCRIPTION_PLANS, SubscriptionTier } from "@/types/subscription";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsUpdating(true);
    
    if (user) {
      setUser({
        ...user,
        name,
        email,
      });
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    
    setIsUpdating(false);
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUpdating(true);
    
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsUpdating(false);
  };
  
  if (!user) {
    return (
      <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Not Authenticated</CardTitle>
            <CardDescription>You need to be logged in to edit your profile.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link to="/">
              <Button className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Link to="/" className="text-sm flex items-center hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-4 flex items-center gap-2">
            <UserCog className="h-7 w-7" />
            Edit Profile
          </h1>
          <p className="text-muted-foreground mt-1">
            Update your profile information and manage your account settings
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Your current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                <Button type="submit" variant="outline" className="w-full" disabled={isUpdating}>
                  <Shield className="mr-2 h-4 w-4" />
                  {isUpdating ? "Updating..." : "Change Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
          
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
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
