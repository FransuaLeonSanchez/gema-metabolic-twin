"use client";
import { AlertOctagon, Gem, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TwinAvatar } from "@/components/Twin/TwinAvatar";
import { peruStats } from "@/lib/mockData";
import type { ScreenId, TwinAppearance } from "@/lib/types";

interface Props {
  onNav: (s: ScreenId) => void;
  appearance: TwinAppearance;
  useImage?: boolean;
}

const BULLETS = [
  {
    value: `${peruStats.notHealthy}%`,
    label: "de peruanos ya tiene el metabolismo dañado, sin saberlo",
    color: "#E11D48",
  },
  {
    value: "5 señales",
    label: "que tu gemelo digital vigila por ti en tiempo real",
    color: "#2563EB",
  },
  {
    value: `${peruStats.twinHealthRemission}%`,
    label: "de remisión de diabetes tipo 2 en 1 año usando gemelos digitales",
    color: "#0D9488",
  },
];

export function WelcomeScreen({ onNav, appearance, useImage = false }: Props) {
  return (
    <div className="h-full overflow-y-auto scroll-hide flex flex-col px-6 pb-6">
      <div className="flex items-center justify-end pt-1 shrink-0">
        <button
          onClick={() => onNav("createTwin")}
          className="text-sub text-[12px] font-bold active:scale-95"
        >
          Saltar
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center text-center pt-1">
        <div className="relative">
          <TwinAvatar mood="tired" size={110} appearance={appearance} useImage={useImage} />
          <div
            className="absolute -right-1 -bottom-1 w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#E11D48",
              color: "#FFFFFF",
              boxShadow: "0 8px 18px #E11D4855",
            }}
          >
            <AlertOctagon size={16} strokeWidth={2.5} />
          </div>
        </div>

        <div
          className="mt-4 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-[0.2em]"
          style={{ backgroundColor: "#E11D481f", color: "#E11D48" }}
        >
          La mitad de la población está afectada
        </div>
        <h1 className="text-txt text-[22px] font-extrabold mt-2 leading-tight">
          El síndrome metabólico avanza en silencio
        </h1>
        <p className="text-sub text-[12.5px] mt-1.5 max-w-[300px] leading-snug">
          Cuando da síntomas, ya es difícil de revertir. Tu gemelo digital lo detecta antes,
          para que actúes a tiempo.
        </p>

        <ul className="mt-4 space-y-2 w-full max-w-[320px]">
          {BULLETS.map((b) => (
            <li
              key={b.label}
              className="flex items-center gap-3 bg-card border border-black/[0.08] rounded-[18px] px-3 py-2"
            >
              <span
                className="min-w-[58px] text-[14px] font-extrabold text-right tabular-nums"
                style={{ color: b.color }}
              >
                {b.value}
              </span>
              <span className="text-txt text-[11.5px] leading-snug text-left">
                {b.label}
              </span>
            </li>
          ))}
        </ul>

        <div
          className="mt-4 w-full max-w-[320px] rounded-[18px] px-4 py-3 flex items-center gap-3 text-left"
          style={{ background: "linear-gradient(135deg,#3D7BF615,#7C5CF615)", border: "1px solid #3D7BF630" }}
        >
          <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-white shrink-0">
            <Gem size={16} />
          </div>
          <p className="text-txt text-[12.5px] font-bold leading-snug">
            Tu salud es una joya. Cuídala con datos, no con suposiciones.
          </p>
        </div>
      </div>

      <div className="shrink-0 pt-4">
        <Button onClick={() => onNav("createTwin")} icon={<Sparkles size={16} />}>
          <span className="flex items-center gap-2">
            Crear mi gemelo digital
            <ChevronRight size={16} />
          </span>
        </Button>
      </div>
    </div>
  );
}
