"use client";

interface FilterOption {
  label: string;
  value: string;
  options: string[];
  active: string;
  onChange: (val: string) => void;
}

interface FilterBarProps {
  search?: string;
  onSearch?: (val: string) => void;
  searchPlaceholder?: string;
  filters?: FilterOption[];
  onReset?: () => void;
  children?: React.ReactNode;
}

const selectStyle = (isActive: boolean): React.CSSProperties => ({
  width: "auto",
  height: 34,
  padding: "0 28px 0 10px",
  borderRadius: 99,
  fontSize: 12,
  fontWeight: isActive ? 600 : 400,
  background: isActive ? "rgba(124,58,237,0.06)" : "#fff",
  color: isActive ? "#7c3aed" : "#475569",
  border: `1px solid ${isActive ? "rgba(124,58,237,0.18)" : "#e8e5f0"}`,
  cursor: "pointer",
  fontFamily: "inherit",
  outline: "none",
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
});

export default function FilterBar({ search, onSearch, searchPlaceholder, filters, onReset, children }: FilterBarProps) {
  const hasActiveFilter = filters?.some(f => f.active !== "Alle" && f.active !== "");
  return (
    <div className="flex gap-2 items-center mb-5" style={{ flexWrap: "nowrap", overflowX: "auto" }}>
      {onSearch !== undefined && (
        <div className="relative" style={{ flex: "0 1 220px", minWidth: 160 }}>
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder={searchPlaceholder || "Suchen..."}
            className="!pl-9"
            style={{ width: "100%", height: 34 }}
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      )}
      {onSearch !== undefined && filters && filters.length > 0 && (
        <div style={{ width: 1, height: 20, background: "#e8e5f0", flexShrink: 0 }} />
      )}
      {filters?.map(f => (
        <select
          key={f.label}
          value={f.active}
          onChange={e => f.onChange(e.target.value)}
          style={selectStyle(f.active !== "Alle" && f.active !== "")}
        >
          <option value="Alle">{f.label}</option>
          {f.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ))}
      {hasActiveFilter && onReset && (
        <button onClick={onReset} className="text-[11px] text-accent font-semibold bg-transparent border-0 cursor-pointer whitespace-nowrap hover:underline" style={{ fontFamily: "inherit" }}>
          Zurücksetzen
        </button>
      )}
      {children}
    </div>
  );
}
