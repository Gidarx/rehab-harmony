
import { useNavigate } from "react-router-dom";
import { Plus, Calendar, ChartBar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";

const QuickActionsDashboardCard = () => {
  const navigate = useNavigate();

  return (
    <DashboardCard 
      title="Ações Rápidas"
      subtitle="Acesso direto"
    >
      <div className="space-y-3">
        <Button
          onClick={() => navigate("/staff/patients/new")}
          className="w-full bg-primary hover:bg-primary-dark group"
        >
          <Plus className="w-4 h-4" />
          Novo Paciente
          <ArrowUpRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          onClick={() => navigate("/staff/activities/new")}
          variant="outline"
          className="w-full group"
        >
          <Calendar className="w-4 h-4" />
          Agendar Atividade
          <ArrowUpRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          onClick={() => navigate("/staff/progress/new")}
          variant="outline"
          className="w-full group"
        >
          <ChartBar className="w-4 h-4" />
          Nova Nota de Progresso
          <ArrowUpRight className="w-4 h-4 ml-auto transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </DashboardCard>
  );
};

export default QuickActionsDashboardCard;
