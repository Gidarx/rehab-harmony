
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
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
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
    <div className="min-h-screen bg-secondary">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="container mx-auto px-4 py-24">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Painel de Controle
                </h1>
                <p className="text-muted-foreground">
                  Bem-vindo ao seu painel de controle
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
