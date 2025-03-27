
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NotAuthenticated from "@/components/profile/NotAuthenticated";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInformation from "@/components/profile/ProfileInformation";
import SubscriptionPlan from "@/components/profile/SubscriptionPlan";
import SecuritySettings from "@/components/profile/SecuritySettings";

const EditProfile = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <NotAuthenticated />;
  }
  
  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="app-container max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/" className="text-sm flex items-center hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          
          <ProfileHeader />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <ProfileInformation user={user} />
          
          <div className="flex flex-col gap-6">
            <SubscriptionPlan user={user} />
            <SecuritySettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
