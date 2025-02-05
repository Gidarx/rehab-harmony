import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { session, profile } = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (allowedRoles && profile?.role && !allowedRoles.includes(profile.role)) {
    // Redirect to the appropriate dashboard based on user role
    const roleBasedRoute = getRoleBasedRoute(profile.role);
    return <Navigate to={roleBasedRoute} replace />;
  }

  return <>{children}</>;
};

// Helper function to determine the appropriate route based on user role
const getRoleBasedRoute = (role: string): string => {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'therapist':
      return '/therapist';
    case 'staff':
      return '/staff';
    case 'family':
      return '/family';
    default:
      return '/';
  }
};

export default ProtectedRoute;