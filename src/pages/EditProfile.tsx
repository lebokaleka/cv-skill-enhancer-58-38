
import { useAuth } from "@/context/AuthContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInformation from "@/components/profile/ProfileInformation";
import SecuritySettings from "@/components/profile/SecuritySettings";
import SubscriptionPlans from "@/components/profile/SubscriptionPlans";
import NotAuthenticated from "@/components/profile/NotAuthenticated";

const EditProfile = () => {
  const { user, setUser } = useAuth();
  
  if (!user) {
    return <NotAuthenticated />;
  }
  
  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <ProfileHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInformation user={user} setUser={setUser} />
          <SecuritySettings />
          <SubscriptionPlans user={user} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
