
import { Link } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const NavLink = ({ to, active, onClick, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        active ? 'text-primary' : 'text-foreground/80'
      }`}
    >
      {children}
    </Link>
  );
};
