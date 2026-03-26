"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";

const kontakte = [
  { name: "Stefan Meier", funktion: "Staffelleiter", bereich: "Verbandsliga Nord Herren", verein: "NWVV", email: "s.meier@nwvv.de", tel: "0511 1234-101", status: "aktiv" },
  { name: "Dr. Claudia Meier", funktion: "Verbandsadmin", bereich: "NWVV Geschäftsstelle", verein: "NWVV", email: "c.meier@nwvv.de", tel: "0511 1234-100", status: "aktiv" },
  { name: "Thomas Weber", funktion: "Vereinsadmin", bereich: "TSV Hannover", verein: "TSV Hannover", email: "t.weber@tsv-hannover.de", tel: "0511 5678-200", status: "aktiv" },
  { name: "Frank Schulze", funktion: "Staffelleiter", bereich: "Bezirksliga Damen 1", verein: "NWVV", email: "f.schulze@nwvv.de", tel: "0511 1234-102", status: "aktiv" },
  { name: "Sabine Kramer", funktion: "Vereinsadmin", bereich: "SVC Göttingen", verein: "SVC Göttingen", email: "s.kramer@svc-goettingen.de", tel: "0551 3344-100", status: "aktiv" },
  { name: "Jörg Becker", funktion: "Schiedsrichter-Obmann", bereich: "Bezirk Hannover", verein: "NWVV", email: "j.becker@nwvv.de", tel: "0511 1234-110", status: "aktiv" },
  { name: "Andrea Fischer", funktion: "Jugendwartin", bereich: "Bezirk Hannover", verein: "NWVV", email: "a.fischer@nwvv.de", tel: "0511 1234-115", status: "aktiv" },
  { name: "Michael Braun", funktion: "Vereinsadmin", bereich: "MTV Braunschweig", verein: "MTV Braunschweig", email: "m.braun@mtv-bs.de", tel: "0531 2233-100", status: "aktiv" },
  { name: "Lars Hoffmann", funktion: "Staffelleiter", bereich: "Kreisliga Herren Hannover", verein: "NWVV", email: "l.hoffmann@nwvv.de", tel: "0511 1234-103", status: "inaktiv" },
  { name: "Petra Neumann", funktion: "Pressewart", bereich: "NWVV", verein: "NWVV", email: "p.neumann@nwvv.de", tel: "0511 1234-120", status: "aktiv" },
  { name: "Kai Zimmermann", funktion: "Vereinsadmin", bereich: "TV Hildesheim", verein: "TV Hildesheim", email: "k.zimmermann@tv-hi.de", tel: "05121 4455-100", status: "aktiv" },
  { name: "Heike Vogel", funktion: "Kassenwart", bereich: "NWVV", verein: "NWVV", email: "h.vogel@nwvv.de", tel: "0511 1234-130", status: "aktiv" },
];

const funktionen = [...new Set(kontakte.map(k => k.funktion))].sort();
const vereine = [...new Set(kontakte.map(k => k.verein))].sort();

export default function Kontakte() {
  const [search, setSearch] = useState("");
  const [filterFunktion, setFilterFunktion] = useState("");
  const [filterVerein, setFilterVerein] = useState("");

  const filtered = kontakte.filter(k => {
    const s = search.toLowerCase();
    const matchSearch = !search || k.name.toLowerCase().includes(s) || k.funktion.toLowerCase().includes(s) || k.verein.toLowerCase().includes(s) || k.email.toLowerCase().includes(s);
    const matchFunktion = !filterFunktion || k.funktion === filterFunktion;
    const matchVerein = !filterVerein || k.verein === filterVerein;
    return matchSearch && matchFunktion && matchVerein;
  });

  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold mb-1">Kontakte</h1>
        <p className="text-[13px] text-text-muted">Funktionäre, Staffelleiter und Vereinsansprechpartner</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 items-center mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 border border-border rounded-md px-2.5 h-[36px] bg-s1 flex-1 max-w-[280px]">
          <Icon name="search" size={14} className="text-text-muted" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name, Funktion oder Verein..." className="!border-0 !p-0 !h-auto text-[12.5px] !bg-transparent" />
        </div>
        <select value={filterFunktion} onChange={e => setFilterFunktion(e.target.value)} className="!h-[36px] !text-[12px] !rounded-full !px-3" style={{ width: "auto" }}>
          <option value="">Alle Funktionen</option>
          {funktionen.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select value={filterVerein} onChange={e => setFilterVerein(e.target.value)} className="!h-[36px] !text-[12px] !rounded-full !px-3" style={{ width: "auto" }}>
          <option value="">Alle Vereine</option>
          {vereine.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        {(filterFunktion || filterVerein) && (
          <button onClick={() => { setFilterFunktion(""); setFilterVerein(""); }} className="text-[11px] text-accent font-semibold bg-transparent border-0 cursor-pointer">Zurücksetzen</button>
        )}
      </div>

      {/* Table */}
      <div className="bg-s1 border border-border rounded-[10px] overflow-hidden">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Name</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Funktion</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Bereich</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Verein</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">E-Mail</th>
              <th className="text-[11px] font-semibold text-text-muted uppercase tracking-wide px-3.5 py-2.5 text-left border-b border-border">Telefon</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((k, i) => (
              <tr key={i} className="hover:bg-s2 cursor-pointer">
                <td className="px-3.5 py-3 border-b border-border">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-accent-dim flex items-center justify-center text-[10px] font-bold text-accent shrink-0">
                      {k.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{k.name}</div>
                      {k.status === "inaktiv" && <span className="text-[10px] text-text-muted">(inaktiv)</span>}
                    </div>
                  </div>
                </td>
                <td className="px-3.5 py-3 border-b border-border"><Badge color={k.funktion.includes("admin") ? "purple" : k.funktion === "Staffelleiter" ? "blue" : "gray"}>{k.funktion}</Badge></td>
                <td className="px-3.5 py-3 border-b border-border text-text-dim">{k.bereich}</td>
                <td className="px-3.5 py-3 border-b border-border">{k.verein}</td>
                <td className="px-3.5 py-3 border-b border-border"><a href={`mailto:${k.email}`} className="text-accent hover:underline text-[12px]">{k.email}</a></td>
                <td className="px-3.5 py-3 border-b border-border text-[12px] text-text-dim">{k.tel}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-3.5 py-2.5 text-[11px] text-text-muted">{filtered.length} von {kontakte.length} Kontakte</div>
      </div>
    </div>
  );
}
