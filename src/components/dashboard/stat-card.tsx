import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  style?: React.CSSProperties;
  changeType?: "positive" | "negative" | "neutral";
  icon: ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  className,
  style,
}: StatCardProps) {
  return (
    <div
      style={style}
      className={cn(
        "bg-card rounded-lg p-6 shadow-card border border-border/50 animate-fade-in",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {change && (
            <p
              className={cn(
                "text-sm font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-accent text-accent-foreground">{icon}</div>
      </div>
    </div>
  );
}
