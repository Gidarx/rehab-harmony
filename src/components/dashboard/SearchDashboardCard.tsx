
import { useNavigate } from "react-router-dom";
import { Search, Users, Calendar, ChartBar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";

const SearchDashboardCard = () => {
  const navigate = useNavigate();

  return (
    <DashboardCard 
      title="Busca Rápida"
      subtitle="Encontre pacientes e atividades"
    >
      <div className="space-y-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Buscar pacientes ou atividades..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-secondary-dark/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="group">
            <Users className="w-4 h-4 mr-2" />
            Pacientes
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="sm" className="group">
            <Calendar className="w-4 h-4 mr-2" />
            Atividades
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="sm" className="group">
            <ChartBar className="w-4 h-4 mr-2" />
            Progresso
            <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};

export default SearchDashboardCard;
