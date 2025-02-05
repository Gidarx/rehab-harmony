import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";

const Index = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.role) {
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
          navigate("/auth");
      }
    }
  }, [profile, navigate]);

  return null; // This component just handles redirection
};

export default Index;