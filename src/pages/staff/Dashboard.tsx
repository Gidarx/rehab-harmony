
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import ActivitiesDashboardCard from "@/components/dashboard/ActivitiesDashboardCard";
import PatientsDashboardCard from "@/components/dashboard/PatientsDashboardCard";
import QuickActionsDashboardCard from "@/components/dashboard/QuickActionsDashboardCard";
import NotificationsDashboardCard from "@/components/dashboard/NotificationsDashboardCard";
import SearchDashboardCard from "@/components/dashboard/SearchDashboardCard";
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
                <ActivitiesDashboardCard 
                  activities={activities} 
                  completionRate={completionRate} 
                />
                <PatientsDashboardCard 
                  patients={patients} 
                  recentActivities={recentActivities} 
                />
                <QuickActionsDashboardCard />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NotificationsDashboardCard 
                  activities={activities} 
                  recentActivities={recentActivities} 
                />
                <SearchDashboardCard />
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
