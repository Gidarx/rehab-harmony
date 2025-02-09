
import { useNavigate } from "react-router-dom";
import { Users, ChartBar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";

interface PatientsDashboardCardProps {
  patients: any[];
  recentActivities: any[];
}

const PatientsDashboardCard = ({ patients, recentActivities }: PatientsDashboardCardProps) => {
  const navigate = useNavigate();

  return (
    <DashboardCard
      title="Pacientes Ativos"
      subtitle="Status atual"
      variant="gradient"
      className="bg-gradient-to-br from-accent-light to-accent text-white"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold">{patients.length}</p>
            <p className="text-sm text-white/80">
              Pacientes em Tratamento
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <Users className="w-8 h-8" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm bg-white/10 p-3 rounded-lg">
          <ChartBar className="w-4 h-4" />
          <span>
            {recentActivities.length} atividades recentes
          </span>
        </div>
        <Button
          onClick={() => navigate("/staff/patients")}
          variant="secondary"
          className="w-full group"
        >
          Ver Pacientes
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </DashboardCard>
  );
};

export default PatientsDashboardCard;
