import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch patients
      const { data: patientsData, error: patientsError } = await supabase
        .from("patients")
        .select("*");

      if (patientsError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load patients",
        });
      } else {
        setPatients(patientsData);
      }

      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from("profiles")
        .select("*");

      if (usersError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load users",
        });
      } else {
        setUsers(usersData);
      }
    };

    fetchData();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard title="Patients Overview">
            <div className="space-y-4">
              <p className="text-2xl font-semibold">{patients.length}</p>
              <p className="text-muted-foreground">Total Patients</p>
              <Button onClick={() => navigate("/admin/patients")}>
                Manage Patients
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard title="Users Overview">
            <div className="space-y-4">
              <p className="text-2xl font-semibold">{users.length}</p>
              <p className="text-muted-foreground">Total Users</p>
              <Button onClick={() => navigate("/admin/users")}>
                Manage Users
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard title="Quick Actions">
            <div className="space-y-4">
              <Button onClick={() => navigate("/admin/patients/new")} className="w-full">
                Add New Patient
              </Button>
              <Button onClick={() => navigate("/admin/users/new")} className="w-full">
                Add New User
              </Button>
            </div>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;