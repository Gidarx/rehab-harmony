
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  ChartBar,
  Clock,
  Plus,
  Search,
  Users,
} from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";
import PatientsPage from "./patients";
import PatientDetailsPage from "./patients/[id]";
import NewPatientPage from "./patients/new";
import ActivitiesPage from "./activities";
import NewActivityPage from "./activities/new";
import ProgressPage from "./progress";
import NewProgressPage from "./progress/new";

const StaffDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [patients, setPatients] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return;

      // Fetch today's activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from("activities")
        .select("*")
        .gte("scheduled_date", new Date().toISOString().split("T")[0])
        .lt(
          "scheduled_date",
          new Date(Date.now() + 86400000).toISOString().split("T")[0]
        )
        .order("scheduled_date", { ascending: true });

      if (activitiesError) {
        console.error("Error fetching activities:", activitiesError);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Falha ao carregar atividades",
        });
      } else {
        setActivities(activitiesData);
      }

      // Fetch active patients
      const { data: patientsData, error: patientsError } = await supabase
        .from("patients")
        .select("*")
        .eq("status", "active");

      if (patientsError) {
        console.error("Error fetching patients:", patientsError);
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Falha ao carregar pacientes",
        });
      } else {
        setPatients(patientsData);
      }

      // Fetch recent activities
      const { data: recentActivitiesData, error: recentActivitiesError } =
        await supabase
          .from("activities")
          .select("*")
          .order("scheduled_date", { ascending: false })
          .limit(5);

      if (recentActivitiesError) {
        console.error("Error fetching recent activities:", recentActivitiesError);
      } else {
        setRecentActivities(recentActivitiesData);
      }
    };

    fetchData();
  }, [session?.user?.id, toast]);

  const completionRate =
    activities.length > 0
      ? ((activities.filter((a) => a.completed_at).length / activities.length) *
          100)
      : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="container mx-auto px-4 pt-24">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Painel de Controle</h1>
                <p className="text-muted-foreground">
                  Bem-vindo ao seu painel de controle
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <DashboardCard
                  title="Atividades de Hoje"
                  variant="gradient"
                  className="bg-gradient-to-br from-primary-light to-primary text-white"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">{activities.length}</p>
                        <p className="text-sm text-white/80">
                          Atividades Agendadas
                        </p>
                      </div>
                      <div className="p-4 bg-white/10 rounded-full">
                        <Clock className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full">
                      <div
                        className="h-2 bg-white rounded-full transition-all"
                        style={{ width: `${completionRate}%` }}
                      />
                    </div>
                    <p className="text-sm text-white/80">
                      {completionRate.toFixed(0)}% Concluído
                    </p>
                    <Button
                      onClick={() => navigate("/staff/activities")}
                      variant="secondary"
                      className="w-full"
                    >
                      Ver Atividades
                    </Button>
                  </div>
                </DashboardCard>

                <DashboardCard
                  title="Pacientes Ativos"
                  variant="gradient"
                  className="bg-gradient-to-br from-accent-light to-accent text-white"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-bold">{patients.length}</p>
                        <p className="text-sm text-white/80">
                          Pacientes em Tratamento
                        </p>
                      </div>
                      <div className="p-4 bg-white/10 rounded-full">
                        <Users className="w-8 h-8" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ChartBar className="w-4 h-4" />
                      <span>
                        {recentActivities.length} atividades recentes
                      </span>
                    </div>
                    <Button
                      onClick={() => navigate("/staff/patients")}
                      variant="secondary"
                      className="w-full"
                    >
                      Ver Pacientes
                    </Button>
                  </div>
                </DashboardCard>

                <DashboardCard title="Ações Rápidas">
                  <div className="space-y-3">
                    <Button
                      onClick={() => navigate("/staff/patients/new")}
                      className="w-full bg-primary hover:bg-primary-dark"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Paciente
                    </Button>
                    <Button
                      onClick={() => navigate("/staff/activities/new")}
                      variant="outline"
                      className="w-full"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Agendar Atividade
                    </Button>
                    <Button
                      onClick={() => navigate("/staff/progress/new")}
                      variant="outline"
                      className="w-full"
                    >
                      <ChartBar className="w-4 h-4 mr-2" />
                      Nova Nota de Progresso
                    </Button>
                  </div>
                </DashboardCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard title="Notificações">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                      <Bell className="w-5 h-5 text-accent" />
                      <div>
                        <p className="text-sm font-medium">
                          {activities.length} atividades pendentes hoje
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Clique para ver detalhes
                        </p>
                      </div>
                    </div>
                    {recentActivities.length > 0 ? (
                      <div className="space-y-2">
                        {recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors"
                          >
                            <span className="text-sm">{activity.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(
                                activity.scheduled_date
                              ).toLocaleDateString()}
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

                <DashboardCard title="Busca Rápida">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Buscar pacientes ou atividades..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        Pacientes
                      </Button>
                      <Button variant="outline" size="sm">
                        Atividades
                      </Button>
                      <Button variant="outline" size="sm">
                        Progresso
                      </Button>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </main>
          }
        />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients/new" element={<NewPatientPage />} />
        <Route path="/patients/:id" element={<PatientDetailsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/new" element={<NewActivityPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/progress/new" element={<NewProgressPage />} />
      </Routes>
    </div>
  );
};

export default StaffDashboard;
