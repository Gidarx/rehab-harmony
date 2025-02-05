import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import { ArrowRight, Users, Calendar, Activity, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="text-center mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-4">
            Welcome to RehabCare
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Empowering Recovery Through Technology
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            A comprehensive platform designed to streamline rehabilitation center management
            and enhance patient care through innovative solutions.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-slide-up">
          <DashboardCard title="Patient Management">
            <div className="flex items-center justify-between">
              <Users className="w-8 h-8 text-primary" />
              <ArrowRight className="w-5 h-5 text-text-light" />
            </div>
          </DashboardCard>

          <DashboardCard title="Treatment Scheduling">
            <div className="flex items-center justify-between">
              <Calendar className="w-8 h-8 text-primary" />
              <ArrowRight className="w-5 h-5 text-text-light" />
            </div>
          </DashboardCard>

          <DashboardCard title="Progress Tracking">
            <div className="flex items-center justify-between">
              <Activity className="w-8 h-8 text-primary" />
              <ArrowRight className="w-5 h-5 text-text-light" />
            </div>
          </DashboardCard>

          <DashboardCard title="Family Communication">
            <div className="flex items-center justify-between">
              <MessageSquare className="w-8 h-8 text-primary" />
              <ArrowRight className="w-5 h-5 text-text-light" />
            </div>
          </DashboardCard>
        </div>

        <section className="glass-card p-8 rounded-2xl max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6">Why Choose RehabCare?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Streamlined Management</h3>
              <p className="text-text-light">
                Efficiently manage patient records, treatment plans, and staff schedules
                all in one place.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Enhanced Communication</h3>
              <p className="text-text-light">
                Keep families informed and involved in the recovery journey through
                our dedicated communication portal.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;