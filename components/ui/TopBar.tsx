"use client";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

export function TopBar({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-1 px-1 py-1 mb-2">
      <button
        onClick={onBack}
        className="w-9 h-9 shrink-0 rounded-full bg-black/[0.035] border border-black/[0.08] flex items-center justify-center active:scale-95 transition disabled:opacity-30"
        disabled={!onBack}
        aria-label="Atrás"
      >
        <ChevronLeft size={18} className="text-txt" />
      </button>
      <h1 className="flex-1 text-center text-txt text-[16px] font-bold tracking-tight truncate px-1">
        {title}
      </h1>
      <div className="h-9 min-w-9 flex items-center justify-end shrink-0">{right}</div>
    </div>
  );
}
