
import { Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

interface NotificationsDashboardCardProps {
  activities: any[];
  recentActivities: any[];
}

const NotificationsDashboardCard = ({ activities, recentActivities }: NotificationsDashboardCardProps) => {
  return (
    <DashboardCard 
      title="Notificações"
      subtitle="Atualizações recentes"
    >
      <div className="space-y-4">
        {activities.length > 0 ? (
          <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20">
            <AlertCircle className="w-5 h-5 text-accent" />
            <div>
              <p className="text-sm font-medium">
                {activities.length} atividades pendentes hoje
              </p>
              <p className="text-xs text-muted-foreground">
                Clique para ver detalhes
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium">
                Nenhuma atividade pendente
              </p>
              <p className="text-xs text-muted-foreground">
                Você está em dia!
              </p>
            </div>
          </div>
        )}
        {recentActivities.length > 0 ? (
          <div className="space-y-2">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{activity.name}</span>
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  {new Date(activity.scheduled_date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhuma atividade recente
          </p>
        )}
      </div>
    </DashboardCard>
  );
};

export default NotificationsDashboardCard;
