interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  noPadding?: boolean;
}

export default function Card({ children, className = "", borderColor, noPadding }: CardProps) {
  return (
    <div
      className={`bg-s1 border border-border rounded-[8px] ${noPadding ? "" : "p-5"} mb-4 ${borderColor ? `border-l-[4px] ${borderColor}` : ""} ${className}`}
    >
      {children}
    </div>
  );
}
