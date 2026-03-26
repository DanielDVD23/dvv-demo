"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import ExportDropdown from "@/components/ui/ExportDropdown";
import Icon from "@/components/ui/Icon";

interface Liga {
  name: string;
  spielklasse: string;
  geschlecht: string;
  mannschaften: number;
  spieltag: string;
  status: "Laufend" | "Abgeschlossen" | "Geplant";
  saison: string;
}

const alleLigen: Liga[] = [
  { name: "Verbandsliga Nord Herren", spielklasse: "Verbandsliga", geschlecht: "Herren", mannschaften: 10, spieltag: "8/22", status: "Laufend", saison: "2025/26" },
  { name: "Verbandsliga Süd Herren", spielklasse: "Verbandsliga", geschlecht: "Herren", mannschaften: 10, spieltag: "9/22", status: "Laufend", saison: "2025/26" },
  { name: "Verbandsliga Nord Damen", spielklasse: "Verbandsliga", geschlecht: "Damen", mannschaften: 8, spieltag: "7/22", status: "Laufend", saison: "2025/26" },
  { name: "Verbandsliga Süd Damen", spielklasse: "Verbandsliga", geschlecht: "Damen", mannschaften: 9, spieltag: "8/22", status: "Laufend", saison: "2025/26" },
  { name: "Bezirksliga Hannover Herren", spielklasse: "Bezirksliga", geschlecht: "Herren", mannschaften: 12, spieltag: "10/22", status: "Laufend", saison: "2025/26" },
  { name: "Bezirksliga Braunschweig Herren", spielklasse: "Bezirksliga", geschlecht: "Herren", mannschaften: 10, spieltag: "9/22", status: "Laufend", saison: "2025/26" },
  { name: "Bezirksliga Hannover Damen", spielklasse: "Bezirksliga", geschlecht: "Damen", mannschaften: 8, spieltag: "7/22", status: "Laufend", saison: "2025/26" },
  { name: "Bezirksliga Weser-Ems Damen", spielklasse: "Bezirksliga", geschlecht: "Damen", mannschaften: 8, spieltag: "8/22", status: "Laufend", saison: "2025/26" },
  { name: "Kreisliga Hannover Herren", spielklasse: "Kreisliga", geschlecht: "Herren", mannschaften: 12, spieltag: "9/22", status: "Laufend", saison: "2025/26" },
  { name: "Kreisliga Braunschweig Herren", spielklasse: "Kreisliga", geschlecht: "Herren", mannschaften: 10, spieltag: "8/22", status: "Laufend", saison: "2025/26" },
  { name: "Kreisliga Göttingen Mixed", spielklasse: "Kreisliga", geschlecht: "Mixed", mannschaften: 8, spieltag: "6/18", status: "Laufend", saison: "2025/26" },
  { name: "Kreisliga Osnabrück Damen", spielklasse: "Kreisliga", geschlecht: "Damen", mannschaften: 6, spieltag: "7/18", status: "Laufend", saison: "2025/26" },
  { name: "Verbandsliga Nord Herren", spielklasse: "Verbandsliga", geschlecht: "Herren", mannschaften: 10, spieltag: "22/22", status: "Abgeschlossen", saison: "2024/25" },
  { name: "Bezirksliga Hannover Damen", spielklasse: "Bezirksliga", geschlecht: "Damen", mannschaften: 8, spieltag: "22/22", status: "Abgeschlossen", saison: "2024/25" },
  { name: "Verbandsliga Nord Herren", spielklasse: "Verbandsliga", geschlecht: "Herren", mannschaften: 0, spieltag: "0/22", status: "Geplant", saison: "2026/27" },
  { name: "Verbandsliga Süd Damen", spielklasse: "Verbandsliga", geschlecht: "Damen", mannschaften: 0, spieltag: "0/22", status: "Geplant", saison: "2026/27" },
];

interface TreeNode {
  name: string;
  count?: number;
  children?: TreeNode[];
  isLiga?: boolean;
}

const federationTree: TreeNode = {
  name: "NWVV",
  count: 24,
  children: [
    {
      name: "Bezirk Hannover",
      count: 12,
      children: [
        { name: "Staffel Nord", count: 6, children: [
          { name: "Verbandsliga Nord Herren", count: 10, isLiga: true },
          { name: "Verbandsliga Nord Damen", count: 8, isLiga: true },
          { name: "Bezirksliga Hannover Herren", count: 12, isLiga: true },
          { name: "Bezirksliga Hannover Damen", count: 8, isLiga: true },
          { name: "Kreisliga Hannover Herren", count: 12, isLiga: true },
          { name: "Kreisliga Osnabrück Damen", count: 6, isLiga: true },
        ]},
        { name: "Staffel Süd", count: 6, children: [
          { name: "Verbandsliga Süd Herren", count: 10, isLiga: true },
          { name: "Verbandsliga Süd Damen", count: 9, isLiga: true },
          { name: "Bezirksliga Weser-Ems Damen", count: 8, isLiga: true },
          { name: "Kreisliga Göttingen Mixed", count: 8, isLiga: true },
        ]},
      ],
    },
    {
      name: "Bezirk Braunschweig",
      count: 8,
      children: [
        { name: "Staffel Ost", count: 4, children: [
          { name: "Bezirksliga Braunschweig Herren", count: 10, isLiga: true },
          { name: "Kreisliga Braunschweig Herren", count: 10, isLiga: true },
        ]},
      ],
    },
    {
      name: "Bezirk Weser-Ems",
      count: 4,
      children: [
        { name: "Staffel West", count: 2, children: [
          { name: "Bezirksliga Weser-Ems Damen", count: 8, isLiga: true },
        ]},
      ],
    },
  ],
};

const statusColor = { Laufend: "green" as const, Abgeschlossen: "gray" as const, Geplant: "blue" as const };
const levelIcons = ["trophy", "bar-chart", "clipboard", "volleyball"];

function TreeView({ node, level = 0, expanded, toggle, onNavigate }: { node: TreeNode; level?: number; expanded: Set<string>; toggle: (name: string) => void; onNavigate?: (screen: string) => void }) {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = expanded.has(node.name);
  const key = `${level}-${node.name}`;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-2 px-3 rounded-[6px] cursor-pointer hover:bg-s2 transition-colors ${node.isLiga ? "hover:bg-accent-dim" : ""}`}
        style={{ paddingLeft: `${12 + level * 20}px` }}
        onClick={() => {
          if (node.isLiga && onNavigate) onNavigate("ligen");
          else if (hasChildren) toggle(node.name);
        }}
      >
        {hasChildren && (
          <svg className={`shrink-0 transition-transform text-text-muted ${isOpen ? "rotate-90" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
        )}
        {!hasChildren && <div className="w-[14px]" />}
        <Icon name={levelIcons[Math.min(level, 3)]} size={16} className="text-text-muted" />
        <span className={`text-[13px] font-medium flex-1 ${node.isLiga ? "text-accent" : ""}`}>{node.name}</span>
        {node.count !== undefined && (
          <Badge color={node.isLiga ? "purple" : "gray"}>{node.count} {node.isLiga ? "Teams" : "Ligen"}</Badge>
        )}
      </div>
      {isOpen && hasChildren && (
        <div className="border-l border-border" style={{ marginLeft: `${22 + level * 20}px` }}>
          {node.children!.map((child, i) => (
            <TreeView key={`${key}-${i}`} node={child} level={level + 1} expanded={expanded} toggle={toggle} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AlleLigen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [season, setSeason] = useState("2025/26");
  const [search, setSearch] = useState("");
  const [filterSpielklasse, setFilterSpielklasse] = useState("Alle");
  const [filterGeschlecht, setFilterGeschlecht] = useState("Alle");
  const [filterStatus, setFilterStatus] = useState("Alle");
  const [treeOpen, setTreeOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["NWVV"]));

  const toggleNode = (name: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const filtered = alleLigen.filter(l => {
    if (l.saison !== season) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterSpielklasse !== "Alle" && l.spielklasse !== filterSpielklasse) return false;
    if (filterGeschlecht !== "Alle" && l.geschlecht !== filterGeschlecht) return false;
    if (filterStatus !== "Alle" && l.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Alle Ligen</h1>
          <p className="text-[13px] text-text-muted">{filtered.length} Ligen · Saison {season}</p>
        </div>
        <ExportDropdown formats={["CSV", "PDF"]} />
      </div>

      {/* Filters – single row, compact pills */}
      <div className="flex gap-2 items-center mb-5" style={{ flexWrap: "nowrap" }}>
        <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: "auto", padding: "5px 28px 5px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: "#fff", color: "#1e1b4b", borderColor: "#e8e5f0" }}>
          <option value="2024/25">2024/25</option>
          <option value="2025/26">2025/26</option>
          <option value="2026/27">2026/27</option>
        </select>
        <div className="relative" style={{ flex: "0 1 200px", minWidth: 140 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Liga suchen..." className="!pl-9" style={{ width: "100%" }} />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </div>
        <div style={{ width: 1, height: 20, background: "#e8e5f0", flexShrink: 0 }} />
        <select value={filterSpielklasse} onChange={e => setFilterSpielklasse(e.target.value)} style={{ width: "auto", padding: "5px 28px 5px 10px", borderRadius: 99, fontSize: 12, fontWeight: filterSpielklasse !== "Alle" ? 600 : 400, background: filterSpielklasse !== "Alle" ? "rgba(124,58,237,0.06)" : "#fff", color: filterSpielklasse !== "Alle" ? "#7c3aed" : "#475569", borderColor: filterSpielklasse !== "Alle" ? "rgba(124,58,237,0.18)" : "#e8e5f0" }}>
          <option value="Alle">Spielklasse</option>
          <option>Verbandsliga</option>
          <option>Bezirksliga</option>
          <option>Kreisliga</option>
        </select>
        <select value={filterGeschlecht} onChange={e => setFilterGeschlecht(e.target.value)} style={{ width: "auto", padding: "5px 28px 5px 10px", borderRadius: 99, fontSize: 12, fontWeight: filterGeschlecht !== "Alle" ? 600 : 400, background: filterGeschlecht !== "Alle" ? "rgba(124,58,237,0.06)" : "#fff", color: filterGeschlecht !== "Alle" ? "#7c3aed" : "#475569", borderColor: filterGeschlecht !== "Alle" ? "rgba(124,58,237,0.18)" : "#e8e5f0" }}>
          <option value="Alle">Geschlecht</option>
          <option>Herren</option>
          <option>Damen</option>
          <option>Mixed</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: "auto", padding: "5px 28px 5px 10px", borderRadius: 99, fontSize: 12, fontWeight: filterStatus !== "Alle" ? 600 : 400, background: filterStatus !== "Alle" ? "rgba(124,58,237,0.06)" : "#fff", color: filterStatus !== "Alle" ? "#7c3aed" : "#475569", borderColor: filterStatus !== "Alle" ? "rgba(124,58,237,0.18)" : "#e8e5f0" }}>
          <option value="Alle">Status</option>
          <option>Laufend</option>
          <option>Abgeschlossen</option>
          <option>Geplant</option>
        </select>
        {(search || filterSpielklasse !== "Alle" || filterGeschlecht !== "Alle" || filterStatus !== "Alle") && (
          <Button variant="ghost" size="sm" onClick={() => { setSearch(""); setFilterSpielklasse("Alle"); setFilterGeschlecht("Alle"); setFilterStatus("Alle"); }}>Zurücksetzen</Button>
        )}
      </div>

      {/* Table */}
      <Card noPadding className="overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {["Liga", "Spielklasse", "Geschlecht", "Mannschaften", "Spieltag", "Status"].map(h => (
                <th key={h} className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, i) => (
              <tr key={i} className="hover:bg-s2 cursor-pointer transition-colors" onClick={() => onNavigate("ligen")}>
                <td className="px-3.5 py-3 border-b border-border font-semibold">{l.name}</td>
                <td className="px-3.5 py-3 border-b border-border"><span className="text-[11px] bg-s2 px-2 py-0.5 rounded text-text-muted">{l.spielklasse}</span></td>
                <td className="px-3.5 py-3 border-b border-border">{l.geschlecht}</td>
                <td className="px-3.5 py-3 border-b border-border font-bold">{l.mannschaften}</td>
                <td className="px-3.5 py-3 border-b border-border">{l.spieltag}</td>
                <td className="px-3.5 py-3 border-b border-border"><Badge color={statusColor[l.status]}>{l.status}</Badge></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="px-3.5 py-8 text-center text-text-muted">Keine Ligen gefunden.</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Federation Structure */}
      <div className="mt-5">
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors mb-3"
          onClick={() => setTreeOpen(!treeOpen)}
        >
          <svg className={`transition-transform ${treeOpen ? "rotate-90" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
          <span className="text-sm font-bold">Verbandsstruktur</span>
          <Badge color="gray">NWVV · {alleLigen.filter(l => l.saison === season).length} Ligen</Badge>
        </div>
        {treeOpen && (
          <Card className="!p-2">
            <TreeView node={federationTree} expanded={expanded} toggle={toggleNode} onNavigate={onNavigate} />
          </Card>
        )}
      </div>
    </div>
  );
}
