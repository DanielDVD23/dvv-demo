const borderColors = {
  green: "border-l-green",
  orange: "border-l-orange",
  red: "border-l-red",
  purple: "border-l-accent",
} as const;

const valueColors = {
  green: "text-green",
  orange: "text-orange",
  red: "text-red",
  purple: "text-accent",
} as const;

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  color: keyof typeof borderColors;
  onClick?: () => void;
}

export default function KpiCard({ label, value, sub, color, onClick }: KpiCardProps) {
  return (
    <div
      className={`bg-s1 border border-border rounded-[10px] px-5 py-[18px] border-l-[3px] ${borderColors[color]} ${onClick ? "cursor-pointer hover:bg-s2 transition-colors" : ""}`}
      onClick={onClick}
    >
      <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-1.5">{label}</div>
      <div className={`text-[28px] font-bold leading-none mb-1 ${valueColors[color]}`}>{value}</div>
      <div className="text-xs text-text-muted">{sub}</div>
    </div>
  );
}
