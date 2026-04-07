"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Icon from "@/components/ui/Icon";

interface Org {
  id: string;
  name: string;
  type: "dvv" | "landesverband" | "verein" | "spielbetrieb";
  ortId: string;
  mitglieder: number;
  status: "aktiv" | "inaktiv" | "aufgeloest";
  bundesland?: string;
  children?: Org[];
}

const ORGS: Org[] = [
  {
    id: "DVV-001", name: "Deutscher Volleyball-Verband", type: "dvv", ortId: "DE-001", mitglieder: 428000, status: "aktiv",
    children: [
      {
        id: "LV-NRW", name: "Westdeutscher Volleyball-Verband", type: "landesverband", ortId: "NRW-001", mitglieder: 68400, status: "aktiv", bundesland: "NRW",
        children: [
          { id: "V-1001", name: "TSV Bayer 04 Leverkusen", type: "verein", ortId: "LEV-001", mitglieder: 245, status: "aktiv", bundesland: "NRW" },
          { id: "V-1002", name: "SWD powervolleys Düren", type: "verein", ortId: "DUE-001", mitglieder: 189, status: "aktiv", bundesland: "NRW" },
          { id: "V-1003", name: "TV Hörde 1911", type: "verein", ortId: "DO-003", mitglieder: 78, status: "aktiv", bundesland: "NRW" },
        ],
      },
      {
        id: "LV-BAY", name: "Bayerischer Volleyball-Verband", type: "landesverband", ortId: "BAY-001", mitglieder: 52300, status: "aktiv", bundesland: "Bayern",
        children: [
          { id: "V-2001", name: "TSV Herrsching", type: "verein", ortId: "HER-001", mitglieder: 312, status: "aktiv", bundesland: "Bayern" },
          { id: "V-2002", name: "Alpenvolleys Haching", type: "verein", ortId: "HAC-001", mitglieder: 198, status: "aktiv", bundesland: "Bayern" },
        ],
      },
      {
        id: "LV-NDS", name: "Niedersächsischer Volleyball-Verband", type: "landesverband", ortId: "NDS-001", mitglieder: 31200, status: "aktiv", bundesland: "Niedersachsen",
        children: [
          { id: "V-3001", name: "Grizzlys Giesen", type: "verein", ortId: "GIE-001", mitglieder: 167, status: "aktiv", bundesland: "Niedersachsen" },
          { id: "V-3002", name: "TSV Hannover", type: "verein", ortId: "HAN-001", mitglieder: 234, status: "aktiv", bundesland: "Niedersachsen" },
        ],
      },
      {
        id: "SB-VBL", name: "Volleyball Bundesliga GmbH", type: "spielbetrieb", ortId: "VBL-001", mitglieder: 24, status: "aktiv",
      },
    ],
  },
];

const typeLabels: Record<string, { label: string; color: "purple" | "blue" | "green" | "orange" }> = {
  dvv: { label: "Dachverband", color: "purple" },
  landesverband: { label: "Landesverband", color: "blue" },
  verein: { label: "Verein", color: "green" },
  spielbetrieb: { label: "Spielbetriebsges.", color: "orange" },
};

const statusColors: Record<string, "green" | "gray" | "red"> = {
  aktiv: "green",
  inaktiv: "gray",
  aufgeloest: "red",
};

const borderColors: Record<string, string> = {
  dvv: "border-l-accent",
  landesverband: "border-l-blue",
  verein: "border-l-green",
  spielbetrieb: "border-l-orange",
};

function OrgRow({ org, depth = 0, onSelect }: { org: Org; depth?: number; onSelect: (o: Org) => void }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = org.children && org.children.length > 0;

  return (
    <>
      <div
        className={`flex items-center gap-3 px-4 py-3 hover:bg-s2 cursor-pointer border-b border-border transition-colors`}
        style={{ paddingLeft: `${16 + depth * 24}px` }}
        onClick={() => onSelect(org)}
      >
        {hasChildren ? (
          <button
            className="w-5 h-5 rounded bg-s2 border border-border flex items-center justify-center text-text-muted hover:text-text cursor-pointer"
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 0.15s" }}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ) : <div className="w-5" />}

        <div className={`w-1 h-8 rounded-full ${depth === 0 ? "bg-accent" : depth === 1 ? "bg-blue" : depth === 2 ? "bg-green" : "bg-orange"}`} />

        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[13px] truncate">{org.name}</div>
          <div className="text-[11px] text-text-muted">{org.ortId}</div>
        </div>

        <div className="text-[12px] text-text-dim text-right w-16">{org.mitglieder.toLocaleString("de-DE")}</div>

        <Badge color={typeLabels[org.type].color}>{typeLabels[org.type].label}</Badge>
        <Badge color={statusColors[org.status]}>{org.status.charAt(0).toUpperCase() + org.status.slice(1)}</Badge>
      </div>

      {expanded && hasChildren && org.children!.map(child => (
        <OrgRow key={child.id} org={child} depth={depth + 1} onSelect={onSelect} />
      ))}
    </>
  );
}

export default function Organisationen() {
  const [search, setSearch] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null);
  const [filterType, setFilterType] = useState("");
  const [showNewModal, setShowNewModal] = useState(false);

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-[22px] font-bold mb-1">Organisationen</h1>
          <p className="text-[13px] text-text-muted">Verbandshierarchie: DVV → Landesverbände → Vereine → Spielbetriebsgesellschaften</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => {}}>
            <Icon name="bar-chart" size={14} /> Export
          </Button>
          <Button onClick={() => setShowNewModal(true)}>+ Neue Organisation</Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="!mb-4 !p-3">
        <div className="flex gap-3 flex-wrap">
          <input
            className="!w-64"
            placeholder="Organisation suchen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="!w-44" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Alle Ebenen</option>
            <option value="dvv">Dachverband</option>
            <option value="landesverband">Landesverband</option>
            <option value="verein">Verein</option>
            <option value="spielbetrieb">Spielbetriebsges.</option>
          </select>
          <select className="!w-44">
            <option value="">Alle Bundesländer</option>
            <option value="NRW">Nordrhein-Westfalen</option>
            <option value="Bayern">Bayern</option>
            <option value="Niedersachsen">Niedersachsen</option>
          </select>
          <select className="!w-36">
            <option value="">Alle Status</option>
            <option value="aktiv">Aktiv</option>
            <option value="inaktiv">Inaktiv</option>
          </select>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        {/* Tree View */}
        <Card noPadding className="!mb-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Hierarchie</span>
            <span className="text-xs text-text-muted">4 Ebenen · 428.000 Mitglieder</span>
          </div>
          <div className="max-h-[calc(100vh-340px)] overflow-y-auto">
            {ORGS.map(org => (
              <OrgRow key={org.id} org={org} onSelect={setSelectedOrg} />
            ))}
          </div>
        </Card>

        {/* Info Panel */}
        <Card className="!mb-0 sticky top-0">
          {selectedOrg ? (
            <div className="animate-fadeIn">
              <div className={`w-full h-1.5 rounded-full mb-4 ${selectedOrg.type === "dvv" ? "bg-accent" : selectedOrg.type === "landesverband" ? "bg-blue" : selectedOrg.type === "verein" ? "bg-green" : "bg-orange"}`} />
              <h3 className="text-[16px] font-bold mb-1">{selectedOrg.name}</h3>
              <div className="flex gap-2 mb-4">
                <Badge color={typeLabels[selectedOrg.type].color}>{typeLabels[selectedOrg.type].label}</Badge>
                <Badge color={statusColors[selectedOrg.status]}>{selectedOrg.status.charAt(0).toUpperCase() + selectedOrg.status.slice(1)}</Badge>
              </div>

              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between"><span className="text-text-muted">ID</span><span className="font-mono text-[12px]">{selectedOrg.id}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Ort-ID</span><span>{selectedOrg.ortId}</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Mitglieder</span><span className="font-semibold">{selectedOrg.mitglieder.toLocaleString("de-DE")}</span></div>
                {selectedOrg.bundesland && <div className="flex justify-between"><span className="text-text-muted">Bundesland</span><span>{selectedOrg.bundesland}</span></div>}
                {selectedOrg.children && <div className="flex justify-between"><span className="text-text-muted">Untergeordnete</span><span>{selectedOrg.children.length}</span></div>}
              </div>

              <div className="mt-5 flex gap-2">
                <Button size="sm">Details öffnen</Button>
                <Button size="sm" variant="ghost">Bearbeiten</Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-xl bg-accent-dim flex items-center justify-center mx-auto mb-3">
                <Icon name="org-tree" size={24} className="text-accent" />
              </div>
              <div className="text-sm font-semibold mb-1">Organisation auswählen</div>
              <div className="text-xs text-text-muted">Klicken Sie auf eine Organisation in der Hierarchie</div>
            </div>
          )}
        </Card>
      </div>

      {/* New Organization Modal */}
      <Modal open={showNewModal} onClose={() => setShowNewModal(false)} title="Neue Organisation">
        <div className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Name</label>
            <input placeholder="Organisationsname eingeben" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Typ</label>
              <select>
                <option>Verein</option>
                <option>Landesverband</option>
                <option>Spielbetriebsges.</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Bundesland</label>
              <select>
                <option>Nordrhein-Westfalen</option>
                <option>Bayern</option>
                <option>Niedersachsen</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-text-dim uppercase tracking-wide mb-1.5 block">Übergeordnete Organisation</label>
            <select>
              <option>Westdeutscher Volleyball-Verband</option>
              <option>Bayerischer Volleyball-Verband</option>
              <option>Niedersächsischer Volleyball-Verband</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-3">
            <Button variant="ghost" onClick={() => setShowNewModal(false)}>Abbrechen</Button>
            <Button onClick={() => setShowNewModal(false)}>Organisation erstellen</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
