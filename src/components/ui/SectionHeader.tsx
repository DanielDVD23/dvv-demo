interface SectionHeaderProps {
  title: string;
  right?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({ title, right, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-3.5 ${className}`}>
      <div className="text-sm font-bold">{title}</div>
      {right}
    </div>
  );
}
