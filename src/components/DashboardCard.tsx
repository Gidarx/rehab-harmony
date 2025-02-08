
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "outline";
  subtitle?: string;
}

const DashboardCard = ({ 
  title, 
  children, 
  className = "",
  variant = "default",
  subtitle 
}: DashboardCardProps) => {
  const baseStyles = "rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg border border-secondary-dark/10 p-6";
  
  const variantStyles = {
    default: "bg-white hover:bg-secondary/50",
    gradient: "bg-gradient-to-br from-primary-light to-primary text-white hover:scale-[1.02]",
    outline: "border-2 border-primary/20 hover:border-primary/40 hover:bg-secondary/50"
  };

  return (
    <div 
      className={cn(
        baseStyles,
        variantStyles[variant],
        "animate-fade-in",
        className
      )}
    >
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
