
import { UserCog } from "lucide-react";

const ProfileHeader = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mt-4 flex items-center gap-2">
        <UserCog className="h-7 w-7" />
        Edit Profile
      </h1>
      <p className="text-muted-foreground mt-1">
        Update your profile information and manage your account settings
      </p>
    </>
  );
};

export default ProfileHeader;
