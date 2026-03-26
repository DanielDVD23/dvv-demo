interface BreadcrumbsProps {
  items: string[];
  onNavigate?: (screen: string) => void;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;
  return (
    <nav className="flex items-center gap-1.5 text-[12px] mb-4">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-text-muted/50">›</span>}
          <span className={i === items.length - 1 ? "font-semibold text-text" : "text-text-muted cursor-pointer hover:text-accent transition-colors"}>
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
}
