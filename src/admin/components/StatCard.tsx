import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subtitle: string;
  color: "amber" | "espresso" | "green" | "blue";
  accentClass?: string;
}

const colorMap = {
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
  },
  espresso: {
    bg: "bg-[#2C1A0E]/5",
    text: "text-[#2C1A0E]",
    border: "border-[#2C1A0E]/10",
  },
  green: {
    bg: "bg-green-50",
    text: "text-green-600",
    border: "border-green-200",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-blue-200",
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subtitle,
  color,
  accentClass,
}) => {
  const colors = colorMap[color];

  return (
    <div
      className={`rounded-lg border ${colors.border} ${colors.bg} p-6 shadow-sm transition-all hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <p className={`mt-3 text-3xl font-bold ${colors.text}`}>{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className={`rounded-full p-3 ${colors.bg} ${colors.text}`}>{icon}</div>
      </div>
    </div>
  );
};
