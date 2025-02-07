import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
          title: "Error",
          description: "Failed to load activities",
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
          title: "Error",
          description: "Failed to load patients",
        });
      } else {
        setPatients(patientsData);
      }
    };

    fetchData();
  }, [session?.user?.id, toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <main className="container mx-auto px-4 pt-24">
              <h1 className="text-3xl font-bold mb-8">Staff Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard
                  title="Today's Activities"
                  variant="gradient"
                  className="bg-gradient-to-br from-primary-light to-primary text-white"
                >
                  <div className="space-y-4">
                    <p className="text-2xl font-semibold">{activities.length}</p>
                    <p className="text-white/80">Scheduled Activities</p>
                    <Button
                      onClick={() => navigate("/staff/activities")}
                      variant="secondary"
                      className="w-full"
                    >
                      View Activities
                    </Button>
                  </div>
                </DashboardCard>

                <DashboardCard
                  title="Active Patients"
                  variant="gradient"
                  className="bg-gradient-to-br from-accent-light to-accent text-white"
                >
                  <div className="space-y-4">
                    <p className="text-2xl font-semibold">{patients.length}</p>
                    <p className="text-white/80">Current Patients</p>
                    <Button
                      onClick={() => navigate("/staff/patients")}
                      variant="secondary"
                      className="w-full"
                    >
                      View Patients
                    </Button>
                  </div>
                </DashboardCard>

                <DashboardCard title="Quick Actions">
                  <div className="space-y-4">
                    <Button
                      onClick={() => navigate("/staff/patients/new")}
                      className="w-full"
                    >
                      Add New Patient
                    </Button>
                    <Button
                      onClick={() => navigate("/staff/activities/new")}
                      variant="outline"
                      className="w-full"
                    >
                      Schedule Activity
                    </Button>
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