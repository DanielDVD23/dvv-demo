"use client";

import Icon from "@/components/ui/Icon";

interface EmptyStateStatsProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyStateStats({ icon = "info", title, description, action }: EmptyStateStatsProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-12 h-12 rounded-full bg-accent-dim text-accent flex items-center justify-center mb-3">
        <Icon name={icon} size={22} />
      </div>
      <h3 className="text-[15px] font-bold text-text mb-1">{title}</h3>
      {description && <p className="text-[13px] text-text-muted max-w-md leading-relaxed">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-white text-[12px] font-semibold cursor-pointer hover:bg-accent-hover transition-colors border-0"
          style={{ fontFamily: "inherit" }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
