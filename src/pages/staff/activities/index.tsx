import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

const ActivitiesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Scheduled Activities</h1>
        <Button onClick={() => navigate("/staff/activities/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Activity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Today's Activities">
          <p className="text-muted-foreground">No activities scheduled for today</p>
        </DashboardCard>

        <DashboardCard title="Upcoming Activities">
          <p className="text-muted-foreground">No upcoming activities</p>
        </DashboardCard>

        <DashboardCard title="Quick Actions">
          <div className="space-y-4">
            <Button variant="outline" className="w-full" onClick={() => navigate("/staff/activities/calendar")}>
              <Calendar className="w-4 h-4 mr-2" />
              View Calendar
            </Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default ActivitiesPage;