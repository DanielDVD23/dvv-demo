"use client";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  large?: boolean;
}

export default function Modal({ open, onClose, title, children, large }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center" onClick={onClose}>
      <div
        className={`bg-s1 border border-border rounded-[14px] p-7 max-w-[95vw] max-h-[90vh] overflow-y-auto animate-slideUp ${large ? "w-[720px]" : "w-[520px]"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[17px] font-bold">{title}</h3>
          <button
            className="bg-s2 border border-border text-text-muted w-7 h-7 rounded-[6px] cursor-pointer text-base flex items-center justify-center hover:text-text"
            onClick={onClose}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
