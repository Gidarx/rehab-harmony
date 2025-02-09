
import { useNavigate } from "react-router-dom";
import { Clock, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/DashboardCard";

interface ActivitiesDashboardCardProps {
  activities: any[];
  completionRate: number;
}

const ActivitiesDashboardCard = ({ activities, completionRate }: ActivitiesDashboardCardProps) => {
  const navigate = useNavigate();

  return (
    <DashboardCard
      title="Atividades de Hoje"
      subtitle="Acompanhamento diário"
      variant="gradient"
      className="bg-gradient-to-br from-primary-light to-primary text-white"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold">{activities.length}</p>
            <p className="text-sm text-white/80">
              Atividades Agendadas
            </p>
          </div>
          <div className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <Clock className="w-8 h-8" />
          </div>
        </div>
        <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/80">Progresso</span>
          <span className="font-medium">{completionRate.toFixed(0)}%</span>
        </div>
        <Button
          onClick={() => navigate("/staff/activities")}
          variant="secondary"
          className="w-full group"
        >
          Ver Atividades
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </DashboardCard>
  );
};

export default ActivitiesDashboardCard;
