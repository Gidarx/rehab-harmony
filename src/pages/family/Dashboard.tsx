import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";

const FamilyDashboard = () => {
  const [patient, setPatient] = useState<any>(null);
  const [recentProgress, setRecentProgress] = useState([]);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch patient information
      const { data: familyData, error: familyError } = await supabase
        .from("patient_family")
        .select(`
          patient_id,
          patients (*)
        `)
        .eq("family_member_id", profile?.id)
        .single();

      if (familyError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load patient information",
        });
      } else if (familyData) {
        setPatient(familyData.patients);

        // Fetch recent progress
        const { data: progressData, error: progressError } = await supabase
          .from("patient_progress")
          .select("*")
          .eq("patient_id", familyData.patient_id)
          .order("session_date", { ascending: false })
          .limit(5);

        if (progressError) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load progress updates",
          });
        } else {
          setRecentProgress(progressData);
        }

        // Fetch upcoming activities
        const { data: activitiesData, error: activitiesError } = await supabase
          .from("activities")
          .select("*")
          .eq("patient_id", familyData.patient_id)
          .gte("scheduled_date", new Date().toISOString())
          .order("scheduled_date", { ascending: true })
          .limit(5);

        if (activitiesError) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load activities",
          });
        } else {
          setUpcomingActivities(activitiesData);
        }
      }
    };

    if (profile?.id) {
      fetchData();
    }
  }, [profile, toast]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24">
          <h1 className="text-3xl font-bold mb-8">Loading...</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">Family Portal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Patient Information">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {patient.first_name} {patient.last_name}
              </h3>
              <p className="text-muted-foreground">
                Admission Date: {new Date(patient.admission_date).toLocaleDateString()}
              </p>
              <Button onClick={() => navigate("/family/patient")}>
                View Details
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard title="Recent Progress">
            <div className="space-y-4">
              <p className="text-2xl font-semibold">{recentProgress.length}</p>
              <p className="text-muted-foreground">Recent Updates</p>
              <Button onClick={() => navigate("/family/progress")}>
                View Progress
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard title="Upcoming Activities">
            <div className="space-y-4">
              <p className="text-2xl font-semibold">{upcomingActivities.length}</p>
              <p className="text-muted-foreground">Scheduled Activities</p>
              <Button onClick={() => navigate("/family/schedule")}>
                View Schedule
              </Button>
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default FamilyDashboard;