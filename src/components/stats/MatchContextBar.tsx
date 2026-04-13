"use client";

import Icon from "@/components/ui/Icon";

interface MatchContextBarProps {
  date: string;
  opponent: string;
  result?: string;            // "3:1"
  matchdays?: { id: string; label: string }[];
  selectedMatchdayId?: string;
  onChangeMatchday?: (id: string) => void;
}

export default function MatchContextBar({
  date,
  opponent,
  result,
  matchdays,
  selectedMatchdayId,
  onChangeMatchday,
}: MatchContextBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 bg-accent-dim rounded-lg px-3.5 py-2 mb-4 text-[12px] flex-wrap">
      <div className="flex items-center gap-2 text-text-dim">
        <Icon name="calendar" size={13} className="text-accent" />
        <span className="font-semibold">{date}</span>
        <span className="text-text-muted">·</span>
        <span>vs. {opponent}</span>
        {result && <>
          <span className="text-text-muted">·</span>
          <span className="font-bold text-accent tabular-nums">{result}</span>
        </>}
      </div>
      {matchdays && onChangeMatchday && (
        <select
          value={selectedMatchdayId}
          onChange={e => onChangeMatchday(e.target.value)}
          className="!py-1 !text-[12px] !w-auto"
        >
          {matchdays.map(m => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      )}
    </div>
  );
}
