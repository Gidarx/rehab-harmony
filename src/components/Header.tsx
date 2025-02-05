import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";

const Header = () => {
  const { profile, signOut } = useAuth();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-secondary-dark/10 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-primary hover:text-primary-dark transition-colors">
          RehabCare
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/patients" className="text-text-light hover:text-primary transition-colors">Patients</Link>
          <Link to="/staff" className="text-text-light hover:text-primary transition-colors">Staff</Link>
          <Link to="/treatments" className="text-text-light hover:text-primary transition-colors">Treatments</Link>
          <Link to="/communication" className="text-text-light hover:text-primary transition-colors">Family Portal</Link>
        </nav>
        {profile ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {profile.first_name} {profile.last_name}
            </span>
            <Button onClick={signOut} variant="outline">
              Sign out
            </Button>
          </div>
        ) : (
          <Link to="/auth">
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;