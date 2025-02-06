import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "gradient" | "outline";
}

const DashboardCard = ({ 
  title, 
  children, 
  className = "",
  variant = "default" 
}: DashboardCardProps) => {
  const baseStyles = "card transition-all duration-300 hover:scale-[1.02] hover:shadow-lg";
  
  const variantStyles = {
    default: "bg-white",
    gradient: "bg-gradient-to-br from-primary-light to-primary text-white",
    outline: "border-2 border-primary/20 hover:border-primary/40"
  };

  return (
    <div className={cn(
      baseStyles,
      variantStyles[variant],
      "animate-fade-in",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;