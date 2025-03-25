
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SubscriptionTier } from '@/types/subscription';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileText, Lock } from 'lucide-react';

type User = {
  id: string;
  name: string;
  email: string;
  subscriptionTier?: SubscriptionTier;
} | null;

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
  const { setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSave = () => {
    if (user) {
      // Update user's name in the context
      setUser({
        ...user,
        name,
      });
      
      // Password change logic would go here in a real app
      
      // Close the modal
      onClose();
    }
  };
  
  const formatSubscriptionName = (tier?: SubscriptionTier) => {
    if (!tier) return 'Free Plan';
    return tier.charAt(0).toUpperCase() + tier.slice(1) + ' Plan';
  };
  
  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          // Ensure we properly clean up before closing
          setTimeout(() => {
            onClose();
          }, 0);
        }
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Profile Settings</DialogTitle>
          <DialogDescription className="sr-only">
            Edit your profile settings
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="space-y-4">
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
                  value={user?.email || ''} 
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-xs text-muted-foreground">Email cannot be changed when logged in with Google</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subscription">Subscription Plan</Label>
                <div className="flex items-center justify-between bg-secondary rounded-md p-3">
                  <span className="font-medium">{formatSubscriptionName(user?.subscriptionTier)}</span>
                  <Button variant="outline" size="sm">
                    Upgrade
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Stored Documents</Label>
                <Button 
                  variant="outline" 
                  className="w-full justify-between items-center"
                >
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    View Stored CVs & Cover Letters
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input 
                  id="current-password" 
                  type="password" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password" 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password" 
                />
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="w-full" disabled={!currentPassword || !newPassword || !confirmPassword}>
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Password change is not available for accounts connected via Google login.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
