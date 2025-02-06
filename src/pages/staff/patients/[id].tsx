import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ArrowLeft, Calendar, ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PatientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: patient, isLoading } = useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("patients")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load patient details",
        });
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading patient details...</div>;
  }

  if (!patient) {
    return <div className="text-center py-8">Patient not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/staff/patients")}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Patients
      </Button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {patient.first_name} {patient.last_name}
            </h1>
            <p className="text-gray-600">
              Status:{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  patient.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {patient.status}
              </span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => navigate(`/staff/patients/${patient.id}/activities`)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              View Activities
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/staff/patients/${patient.id}/progress`)}
            >
              <ClipboardList className="w-4 h-4 mr-2" />
              View Progress
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
              <p className="mt-1">
                {format(new Date(patient.date_of_birth), "MMMM d, yyyy")}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Admission Date
              </h3>
              <p className="mt-1">
                {format(new Date(patient.admission_date), "MMMM d, yyyy")}
              </p>
            </div>
            {patient.expected_discharge_date && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Expected Discharge Date
                </h3>
                <p className="mt-1">
                  {format(
                    new Date(patient.expected_discharge_date),
                    "MMMM d, yyyy"
                  )}
                </p>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Medical History
            </h3>
            <p className="mt-1 text-gray-900">
              {patient.medical_history || "No medical history recorded"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;