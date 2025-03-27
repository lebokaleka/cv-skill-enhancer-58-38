
import { ArrowLeft, UserCog } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileHeader = () => {
  return (
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
  );
};

export default ProfileHeader;
