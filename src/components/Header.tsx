import { Link } from "react-router-dom";

const Header = () => {
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
        <button className="btn-primary">Login</button>
      </div>
    </header>
  );
};

export default Header;