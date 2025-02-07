import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChartLine, Plus } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

const ProgressPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patient Progress</h1>
        <Button onClick={() => navigate("/staff/progress/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Progress Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Recent Progress Notes">
          <p className="text-muted-foreground">No recent progress notes</p>
        </DashboardCard>

        <DashboardCard title="Progress Overview">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <ChartLine className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Progress tracking will be implemented soon</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default ProgressPage;