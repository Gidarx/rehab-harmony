import { useAuth } from "@/components/AuthProvider";
import Header from "@/components/Header";

const StaffDashboard = () => {
  const { profile } = useAuth();

  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>
        <p>Welcome, {profile?.first_name}!</p>
        {/* Staff-specific content will be added here */}
      </main>
    </div>
  );
};

export default StaffDashboard;