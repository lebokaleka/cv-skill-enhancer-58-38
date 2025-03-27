
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Shield, UserCog } from "lucide-react";
import { Link } from "react-router-dom";

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
    
    // Simulate API call with timeout
    setTimeout(() => {
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
    }, 1000);
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
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsUpdating(false);
    }, 1000);
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
      <div className="app-container max-w-4xl mx-auto">
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
        
        <div className="grid gap-6 md:grid-cols-2">
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
          
          <div className="flex flex-col gap-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
