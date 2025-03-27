
import { Link } from 'react-router-dom';

interface LogoProps {
  onClick: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center gap-2" onClick={onClick}>
      <span className="font-bold text-xl tracking-tight">CVCoach</span>
    </Link>
  );
};

export default Logo;
