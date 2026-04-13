import Icon from "@/components/ui/Icon";

const borderColors = {
  green: "border-l-green",
  orange: "border-l-orange",
  red: "border-l-red",
  purple: "border-l-accent",
  blue: "border-l-blue",
} as const;

const valueColors = {
  green: "text-green",
  orange: "text-orange",
  red: "text-red",
  purple: "text-accent",
  blue: "text-blue",
} as const;

const iconBgColors = {
  green: "bg-green/10 text-green",
  orange: "bg-orange/10 text-orange",
  red: "bg-red/10 text-red",
  purple: "bg-accent/10 text-accent",
  blue: "bg-blue/10 text-blue",
} as const;

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  color: keyof typeof borderColors;
  icon?: string;
  onClick?: () => void;
}

export default function KpiCard({ label, value, sub, color, icon, onClick }: KpiCardProps) {
  return (
    <div
      className={`bg-s1 border border-border rounded-[10px] px-5 py-[18px] border-l-[3px] ${borderColors[color]} ${onClick ? "cursor-pointer hover:bg-s2 transition-colors" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wide">{label}</div>
        {icon && (
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBgColors[color]}`}>
            <Icon name={icon} size={16} />
          </div>
        )}
      </div>
      <div className={`text-[28px] font-bold leading-none mb-1 ${valueColors[color]}`}>{value}</div>
      <div className="text-xs text-text-muted">{sub}</div>
    </div>
  );
}
