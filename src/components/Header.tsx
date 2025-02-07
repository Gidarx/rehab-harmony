import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";
import { Users, Calendar, ChartLine } from "lucide-react";

const Header = () => {
  const { signOut, profile } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-xl font-bold text-primary">
              Cuidado do Paciente
            </Link>
            {profile?.role === "staff" && (
              <nav className="hidden md:flex items-center gap-4">
                <Link
                  to="/staff/patients"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Users className="w-4 h-4" />
                  Pacientes
                </Link>
                <Link
                  to="/staff/activities"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Calendar className="w-4 h-4" />
                  Atividades
                </Link>
                <Link
                  to="/staff/progress"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <ChartLine className="w-4 h-4" />
                  Progresso
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={handleSignOut} variant="outline">
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;