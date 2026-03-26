import type { LucideIcon } from "lucide-react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  color: "blue" | "green" | "amber" | "red";
}

const colorMap = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600" },
  green: { bg: "bg-green-50", icon: "text-green-600" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600" },
  red: { bg: "bg-red-50", icon: "text-red-600" },
};

export default function KpiCard({ title, value, change, icon: Icon, color }: KpiCardProps) {
  const isPositive = change >= 0;
  const colors = colorMap[color];

  return (
    <div className="bg-card-bg rounded-xl border border-card-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={`${colors.bg} rounded-lg p-2`}>
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
    </div>
  );
}
