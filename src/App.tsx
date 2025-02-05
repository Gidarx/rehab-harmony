import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/Dashboard";
import TherapistDashboard from "./pages/therapist/Dashboard";
import StaffDashboard from "./pages/staff/Dashboard";
import FamilyDashboard from "./pages/family/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-secondary">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              
              {/* Admin routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Therapist routes */}
              <Route
                path="/therapist/*"
                element={
                  <ProtectedRoute allowedRoles={["therapist"]}>
                    <TherapistDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Staff routes */}
              <Route
                path="/staff/*"
                element={
                  <ProtectedRoute allowedRoles={["staff"]}>
                    <StaffDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Family routes */}
              <Route
                path="/family/*"
                element={
                  <ProtectedRoute allowedRoles={["family"]}>
                    <FamilyDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Root route - redirects based on role */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;