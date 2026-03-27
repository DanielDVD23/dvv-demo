"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import FilterBar from "@/components/ui/FilterBar";

interface Kontakt {
  name: string;
  initialen: string;
  avatarBg: string;
  rolle: string;
  verein: string;
  liga: string;
  mannschaft: string;
  status: "aktiv" | "inaktiv";
}

const kontakte: Kontakt[] = [
  { name: "Thomas Weber", initialen: "TW", avatarBg: "#02ca4b", rolle: "Vereinsadmin", verein: "TSV Hannover", liga: "Verbandsliga Nord", mannschaft: "Herren I", status: "aktiv" },
  { name: "Dr. Claudia Meier", initialen: "CM", avatarBg: "#3b82f6", rolle: "Verbandsadmin", verein: "NWVV", liga: "\u2014", mannschaft: "\u2014", status: "aktiv" },
  { name: "Michael Krause", initialen: "MK", avatarBg: "#f97316", rolle: "Trainer", verein: "TSV Hannover", liga: "Verbandsliga Nord", mannschaft: "Herren I", status: "aktiv" },
  { name: "Markus Schr\u00f6der", initialen: "MS", avatarBg: "#794dff", rolle: "SR-Wart", verein: "Bezirk Hannover", liga: "\u2014", mannschaft: "\u2014", status: "aktiv" },
  { name: "Anna Fischer", initialen: "AF", avatarBg: "#ec4899", rolle: "Staffelleiterin", verein: "NWVV", liga: "Bezirksliga S\u00fcd", mannschaft: "\u2014", status: "aktiv" },
  { name: "Jens Prie\u00df", initialen: "JP", avatarBg: "#02ca4b", rolle: "Vereinsadmin", verein: "MTV Wolfsburg", liga: "Verbandsliga Nord", mannschaft: "Herren I, Damen", status: "aktiv" },
  { name: "Laura Berger", initialen: "LB", avatarBg: "#8b5cf6", rolle: "Trainerin", verein: "SVC G\u00f6ttingen", liga: "Bezirksliga S\u00fcd", mannschaft: "Damen I", status: "aktiv" },
  { name: "Peter Hoffmann", initialen: "PH", avatarBg: "#06b6d4", rolle: "Vereinsadmin", verein: "SC Paderborn", liga: "Verbandsliga Nord", mannschaft: "Herren I", status: "inaktiv" },
  { name: "Sandra M\u00fcller", initialen: "SM", avatarBg: "#ef4444", rolle: "Schiedsrichterin", verein: "\u2014", liga: "Verbandsliga Nord", mannschaft: "\u2014", status: "aktiv" },
  { name: "Karl Richter", initialen: "KR", avatarBg: "#f97316", rolle: "Trainer", verein: "VfR Bielefeld", liga: "Verbandsliga Nord", mannschaft: "Herren I", status: "aktiv" },
];

const totalKontakte = 48;

const rollen = [...new Set(kontakte.map(k => k.rolle))].sort();
const vereine = [...new Set(kontakte.map(k => k.verein).filter(v => v !== "\u2014"))].sort();
const ligen = [...new Set(kontakte.map(k => k.liga).filter(l => l !== "\u2014"))].sort();

export default function Kontakte() {
  const [search, setSearch] = useState("");
  const [filterRolle, setFilterRolle] = useState("");
  const [filterVerein, setFilterVerein] = useState("");
  const [filterLiga, setFilterLiga] = useState("");
  const [sortierung, setSortierung] = useState("Name");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = kontakte.filter(k => {
    const s = search.toLowerCase();
    const matchSearch = !search || k.name.toLowerCase().includes(s) || k.verein.toLowerCase().includes(s) || k.rolle.toLowerCase().includes(s);
    const matchRolle = !filterRolle || k.rolle === filterRolle;
    const matchVerein = !filterVerein || k.verein === filterVerein;
    const matchLiga = !filterLiga || k.liga === filterLiga;
    return matchSearch && matchRolle && matchVerein && matchLiga;
  });

  const thStyle: React.CSSProperties = {
    fontSize: 12,
    fontWeight: 500,
    color: "#94a3b8",
    padding: "12px 16px",
    textAlign: "left",
    borderBottom: "1px solid #e2e8f0",
  };

  const tdStyle: React.CSSProperties = {
    padding: "12px 16px",
    fontSize: 13,
    borderBottom: "1px solid #e2e8f0",
  };

  const pages = [1, 2, 3, 5];

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Kontakte</h1>
          <p className="text-[13px] text-text-muted">48 Kontakte &middot; NWVV &middot; Saison 2025/26</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            style={{
              height: 36,
              padding: "0 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              border: "1px solid #e2e8f0",
              background: "#fff",
              color: "#334155",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Icon name="download" size={15} />
            Export
          </button>
          <button
            style={{
              height: 36,
              padding: "0 16px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              border: "none",
              background: "#794dff",
              color: "#fff",
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            + Kontakt hinzuf&uuml;gen
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        searchPlaceholder="Name, Verein oder Rolle"
        filters={[
          { label: "Rolle", value: "rolle", options: rollen, active: filterRolle || "Alle", onChange: v => setFilterRolle(v === "Alle" ? "" : v) },
          { label: "Verein", value: "verein", options: vereine, active: filterVerein || "Alle", onChange: v => setFilterVerein(v === "Alle" ? "" : v) },
          { label: "Liga", value: "liga", options: ligen, active: filterLiga || "Alle", onChange: v => setFilterLiga(v === "Alle" ? "" : v) },
          { label: "Sortierung", value: "sortierung", options: ["Name", "Rolle", "Verein"], active: sortierung, onChange: v => setSortierung(v) },
        ]}
        onReset={() => { setFilterRolle(""); setFilterVerein(""); setFilterLiga(""); setSortierung("Name"); }}
      />

      {/* Table */}
      <div className="bg-s1 rounded-[12px] overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
        <table className="w-full border-collapse" style={{ tableLayout: "auto" }}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Rolle</th>
              <th style={thStyle}>Verein</th>
              <th style={thStyle}>Liga</th>
              <th style={thStyle}>Mannschaft</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((k, i) => (
              <tr key={i} className="hover:bg-s2 cursor-pointer">
                {/* Name with avatar */}
                <td style={tdStyle}>
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: k.avatarBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                        letterSpacing: 0.5,
                      }}
                    >
                      {k.initialen}
                    </div>
                    <span className="font-semibold text-[13px]">{k.name}</span>
                  </div>
                </td>

                {/* Rolle */}
                <td style={tdStyle}>
                  <span className="text-[13px] text-text-dim">{k.rolle}</span>
                </td>

                {/* Verein (purple link) */}
                <td style={tdStyle}>
                  {k.verein !== "\u2014" ? (
                    <span style={{ color: "#794dff", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>{k.verein}</span>
                  ) : (
                    <span className="text-text-dim text-[13px]">{k.verein}</span>
                  )}
                </td>

                {/* Liga */}
                <td style={tdStyle}>
                  <span className="text-[13px] text-text-dim">{k.liga}</span>
                </td>

                {/* Mannschaft */}
                <td style={tdStyle}>
                  <span className="text-[13px] text-text-dim">{k.mannschaft}</span>
                </td>

                {/* Status */}
                <td style={tdStyle}>
                  <Badge color={k.status === "aktiv" ? "green" : "gray"}>
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: k.status === "aktiv" ? "#22c55e" : "#94a3b8",
                        display: "inline-block",
                        flexShrink: 0,
                      }}
                    />
                    {k.status === "aktiv" ? "Aktiv" : "Inaktiv"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "12px 16px", borderTop: "1px solid #e2e8f0" }}
        >
          <span className="text-[13px] text-text-muted">
            1&ndash;10 von {totalKontakte} Kontakten
          </span>
          <div className="flex items-center gap-1">
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: "1px solid #e2e8f0",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                color: "#94a3b8",
                fontFamily: "inherit",
              }}
            >
              &laquo;
            </button>
            {pages.map(p => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  border: currentPage === p ? "none" : "1px solid #e2e8f0",
                  background: currentPage === p ? "#794dff" : "#fff",
                  color: currentPage === p ? "#fff" : "#334155",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: currentPage === p ? 600 : 400,
                  fontFamily: "inherit",
                }}
              >
                {p}
              </button>
            ))}
            <button
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: "1px solid #e2e8f0",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                color: "#94a3b8",
                fontFamily: "inherit",
              }}
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
