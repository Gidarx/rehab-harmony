import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";

const StaffDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
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
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">Staff Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Today's Activities">
            <div className="space-y-4">
              <p className="text-2xl font-semibold">{activities.length}</p>
              <p className="text-muted-foreground">Scheduled Activities</p>
              <Button onClick={() => navigate("/staff/activities")}>
                View Activities
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard title="Active Patients">
            <div className="space-y-4">
              <p className="text-2xl font-semibold">{patients.length}</p>
              <p className="text-muted-foreground">Current Patients</p>
              <Button onClick={() => navigate("/staff/patients")}>
                View Patients
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard title="Quick Actions">
            <div className="space-y-4">
              <Button onClick={() => navigate("/staff/activities/complete")} className="w-full">
                Complete Activities
              </Button>
              <Button onClick={() => navigate("/staff/schedule")} className="w-full">
                View Schedule
              </Button>
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;