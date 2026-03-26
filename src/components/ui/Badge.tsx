const colorMap = {
  green: "bg-green-dim text-green",
  orange: "bg-orange-dim text-orange",
  red: "bg-red-dim text-red",
  purple: "bg-accent-dim text-accent",
  blue: "bg-blue-dim text-blue",
  gray: "bg-[rgba(100,116,139,.15)] text-text-muted",
} as const;

interface BadgeProps {
  color: keyof typeof colorMap;
  children: React.ReactNode;
}

export default function Badge({ color, children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${colorMap[color]}`}>
      {children}
    </span>
  );
}
