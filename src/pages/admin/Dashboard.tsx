import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardCard from "@/components/DashboardCard";
import Header from "@/components/Header";
import { Users, Activity, Plus } from "lucide-react";

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
    <div className="min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => navigate("/admin/patients/new")} className="gap-2">
            <Plus size={16} />
            Add Patient
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard 
            title="Patients Overview" 
            variant="gradient"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Users size={24} />
              </div>
              <div>
                <p className="text-2xl font-semibold">{patients.length}</p>
                <p className="text-sm opacity-80">Total Patients</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/admin/patients")}
              variant="secondary"
              className="w-full mt-4"
            >
              Manage Patients
            </Button>
          </DashboardCard>

          <DashboardCard 
            title="Users Overview"
            variant="outline"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{users.length}</p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/admin/users")}
              className="w-full mt-4"
            >
              Manage Users
            </Button>
          </DashboardCard>

          <DashboardCard title="Quick Actions">
            <div className="space-y-4">
              <Button 
                onClick={() => navigate("/admin/patients/new")} 
                className="w-full justify-start gap-2"
              >
                <Plus size={16} />
                Add New Patient
              </Button>
              <Button 
                onClick={() => navigate("/admin/users/new")} 
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <Users size={16} />
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