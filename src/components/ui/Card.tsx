interface CardProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  noPadding?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = "", borderColor, noPadding, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-s1 border border-border rounded-[8px] ${noPadding ? "" : "p-5"} mb-4 ${borderColor ? `border-l-[4px] ${borderColor}` : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
