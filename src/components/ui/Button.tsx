interface ButtonProps {
  variant?: "primary" | "ghost" | "danger" | "success" | "warning";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  ghost: "bg-transparent text-text-dim border border-border hover:bg-s2 hover:text-text",
  danger: "bg-red-dim text-red border border-[rgba(239,68,68,0.2)]",
  success: "bg-green-dim text-green border border-[rgba(34,197,94,0.2)]",
  warning: "bg-orange-dim text-orange border border-[rgba(217,119,6,0.2)]",
} as const;

export default function Button({ variant = "primary", size = "md", children, className = "", onClick, disabled }: ButtonProps) {
  const sizeClass = size === "sm" ? "h-7 px-2.5 text-xs" : "h-9 px-3.5 text-[13px]";
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-[6px] font-medium cursor-pointer border-none font-[inherit] transition-all ${variants[variant]} ${sizeClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
