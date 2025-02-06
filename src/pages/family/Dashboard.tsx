import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";
import { User, Calendar, ClipboardList } from "lucide-react";

const FamilyDashboard = () => {
  const [patient, setPatient] = useState<any>(null);
  const [recentProgress, setRecentProgress] = useState([]);
  const [upcomingActivities, setUpcomingActivities] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.id) return;

      // Fetch patient information
      const { data: familyData, error: familyError } = await supabase
        .from("patient_family")
        .select(`
          patient_id,
          patients (*)
        `)
        .eq("family_member_id", profile.id)
        .maybeSingle();

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

    fetchData();
  }, [profile, toast]);

  if (!patient) {
    return (
      <div className="min-h-screen bg-secondary">
        <Header />
        <main className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">Family Portal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="Patient Information"
            variant="gradient"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  {patient.first_name} {patient.last_name}
                </h3>
                <p className="text-sm opacity-80">
                  Admission: {new Date(patient.admission_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/family/patient")}
              variant="secondary"
              className="w-full mt-4"
            >
              View Details
            </Button>
          </DashboardCard>

          <DashboardCard 
            title="Recent Progress"
            variant="outline"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ClipboardList size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{recentProgress.length}</p>
                <p className="text-sm text-gray-500">Recent Updates</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/family/progress")}
              className="w-full mt-4"
            >
              View Progress
            </Button>
          </DashboardCard>

          <DashboardCard title="Upcoming Activities">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{upcomingActivities.length}</p>
                <p className="text-sm text-gray-500">Scheduled Activities</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/family/schedule")}
              variant="outline"
              className="w-full mt-4"
            >
              View Schedule
            </Button>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default FamilyDashboard;