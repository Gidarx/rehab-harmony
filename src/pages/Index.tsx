import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!profile?.role) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "User role not found",
      });
      return;
    }

    // Redirect based on user role
    switch (profile.role) {
      case "admin":
        navigate("/admin");
        break;
      case "therapist":
        navigate("/therapist");
        break;
      case "staff":
        navigate("/staff");
        break;
      case "family":
        navigate("/family");
        break;
      default:
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid user role",
        });
    }
  }, [profile, navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-muted-foreground">Please wait while we redirect you to your dashboard.</p>
      </div>
    </div>
  );
};

export default Index;