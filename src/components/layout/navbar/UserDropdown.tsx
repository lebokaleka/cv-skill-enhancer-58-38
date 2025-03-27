
import { LogOut, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropdown = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    document.dispatchEvent(new Event('logout'));
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative flex items-center gap-2 px-3 py-2 rounded-full h-auto min-w-[120px] ml-2 bg-[#46235C] text-white hover:bg-[#46235C]/90"
        >
          <span className="text-sm font-medium">
            {user?.name || 'User'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            {user?.subscriptionTier && (
              <p className="text-xs text-primary font-medium">
                {user.subscriptionTier.charAt(0).toUpperCase() + user.subscriptionTier.slice(1)} Plan
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center cursor-pointer"
          onClick={() => window.open('/edit-profile', '_self')}
        >
          <UserCog className="mr-2 h-4 w-4" />
          Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
