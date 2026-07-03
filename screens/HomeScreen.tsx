"use client";
import {
  Bell,
  ChevronRight,
  Droplet,
  Activity,
  Moon,
  Heart,
  Leaf,
  Sparkles,
  Coffee,
  Soup,
  Apple,
  Check,
  UtensilsCrossed,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ScoreRing } from "@/components/charts/ScoreRing";
import { Sparkline } from "@/components/charts/Sparkline";
import { TwinAvatar } from "@/components/Twin/TwinAvatar";
import { glucoseDay, mockUser, recommendations } from "@/lib/mockData";
import { liveSubIndices, twinState } from "@/lib/icm";
import type { Meal, MealType, ScreenId, SubIndexKey, TwinAppearance } from "@/lib/types";

interface Props {
  onNav: (s: ScreenId) => void;
  onOpenSubIndex: (k: SubIndexKey) => void;
  appearance: TwinAppearance;
  icm: number;
  useImage?: boolean;
  alertsUnread?: boolean;
  meals: Meal[];
}

const MEAL_ICONS: Record<MealType, any> = {
  Desayuno: Coffee,
  Almuerzo: Soup,
  Cena: Moon,
  Snack: Apple,
};
const MEAL_COLORS: Record<MealType, string> = {
  Desayuno: "#D97706",
  Almuerzo: "#0284C7",
  Cena: "#7C3AED",
  Snack: "#16A34A",
};
const MEAL_ORDER: MealType[] = ["Desayuno", "Almuerzo", "Cena", "Snack"];

const ICONS: Record<string, any> = {
  Glucosa: Droplet,
  Actividad: Activity,
  Sueño: Moon,
  Estrés: Heart,
  Nutrición: Leaf,
};

export function HomeScreen({
  onNav,
  onOpenSubIndex,
  appearance,
  icm,
  alertsUnread = true,
  useImage = false,
  meals,
}: Props) {
  const ts = twinState(icm);
  const subIndices = liveSubIndices(meals);
  const peak = Math.max(...glucoseDay);
  const peakIdx = glucoseDay.indexOf(peak);
  const peakTime = `${String(Math.floor(peakIdx / 2)).padStart(2, "0")}:${peakIdx % 2 === 0 ? "00" : "30"}`;
  const current = glucoseDay[glucoseDay.length - 1];
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";

  return (
    <div className="h-full overflow-y-auto scroll-hide px-5 pt-2 pb-[110px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <div>
          <p className="text-sub text-[12px] font-medium">{greeting}</p>
          <h1 className="text-txt text-[22px] font-extrabold tracking-tight">
            Hola, {mockUser.name} 👋
          </h1>
        </div>
        <button
          onClick={() => onNav("alerts")}
          className="relative w-10 h-10 rounded-full bg-black/[0.035] border border-black/[0.08] flex items-center justify-center active:scale-95 transition"
        >
          <Bell size={18} className="text-txt" />
          {alertsUnread && (
            <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-brand-red shadow-[0_0_6px_#E11D48]" />
          )}
        </button>
      </div>

      {/* Recomendación del día — el tip va primero, más grande que el diagnóstico */}
      <div
        className="relative rounded-[24px] p-4 shadow-card overflow-hidden active:scale-[0.985] cursor-pointer transition-transform"
        style={{ background: "linear-gradient(135deg,#3D7BF6,#7C5CF6)" }}
        onClick={() => onNav("recommendations")}
      >
        <div className="flex items-center gap-1.5 text-white/90 text-[11px] font-extrabold uppercase tracking-[0.16em]">
          <Sparkles size={13} />
          Tip para hoy
        </div>
        <p className="text-white text-[17px] font-extrabold mt-2 leading-tight">
          {recommendations[0].title}
        </p>
        <p className="text-white/85 text-[12.5px] mt-1.5 leading-snug">
          {recommendations[0].reason}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-white/80 text-[11px] font-bold">
            💎 Tu salud es una joya. Cuídala hoy.
          </span>
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <ChevronRight size={16} className="text-white" />
          </span>
        </div>
      </div>

      {/* ICM hero card */}
      <div
        className="relative rounded-[24px] border border-black/[0.07] p-4 shadow-card overflow-hidden mt-3"
        style={{
          background: `radial-gradient(130% 120% at 0% 0%, ${ts.color}1C 0%, transparent 55%), linear-gradient(180deg, #EEF3FB 0%, #FFFFFF 100%)`,
          transition: "background 500ms",
        }}
      >
        <div className="flex items-center gap-4">
          <ScoreRing value={icm} color={ts.color} size={132} />
          <div className="flex-1">
            <Pill color={ts.color}>{ts.label}</Pill>
            <p className="text-txt text-[14px] font-bold mt-2 leading-tight">
              Índice de Carga Metabólica de hoy
            </p>
            <p className="text-sub text-[12px] mt-1 leading-snug">
              Tu sueño y glucosa son los que más suman riesgo.
            </p>
          </div>
        </div>
      </div>

      {/* Twin card */}
      <div className="mt-3">
        <Card onClick={() => onNav("twin")}>
          <div className="flex items-center gap-3">
            <TwinAvatar mood={ts.mood} size={86} appearance={appearance} useImage={useImage} />
            <div className="flex-1">
              <p className="text-txt text-[14px] font-extrabold">Tu gemelo digital</p>
              <p className="text-sub text-[12px] mt-0.5 leading-snug">
                Hoy se ve <span style={{ color: ts.color, fontWeight: 700 }}>{ts.label.toLowerCase()}</span>.
                Tócalo para simular escenarios.
              </p>
            </div>
            <ChevronRight size={18} className="text-sub" />
          </div>
        </Card>
      </div>

      <SectionTitle>Tus señales de hoy</SectionTitle>
      <div className="grid grid-cols-2 gap-3">
        {subIndices.map((s) => {
          const Icon = ICONS[s.key] ?? Sparkles;
          return (
            <Card key={s.key} onClick={() => onOpenSubIndex(s.key as SubIndexKey)}>
              <div className="flex items-start gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${s.color}22`, color: s.color }}
                >
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-txt text-[12px] font-bold truncate">{s.key}</p>
                  <p className="text-hint text-[10px]">peso {s.weight}%</p>
                </div>
              </div>
              <div className="mt-3">
                <ProgressBar value={s.value} color={s.color} />
                <p className="text-[11px] mt-1.5 font-bold" style={{ color: s.color }}>
                  {s.value}/100
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <SectionTitle
        right={
          <button
            onClick={() => onNav("log")}
            className="text-brand-blue text-[11px] font-extrabold inline-flex items-center gap-1"
          >
            Registrar <ChevronRight size={12} />
          </button>
        }
      >
        Tus comidas de hoy
      </SectionTitle>
      <Card onClick={() => onNav("log")}>
        {(() => {
          const totalKcal = meals.reduce((a, m) => a + m.kcal, 0);
          const totalCarbs = meals.reduce((a, m) => a + m.carbs, 0);
          const filled = meals.length;
          return (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-brand-blue/15 text-brand-blue flex items-center justify-center">
                    <UtensilsCrossed size={16} />
                  </div>
                  <div>
                    <p className="text-txt text-[13px] font-extrabold leading-tight">
                      {filled === 0
                        ? "Aún sin registrar"
                        : `${filled} ${filled === 1 ? "comida" : "comidas"} hoy`}
                    </p>
                    <p className="text-sub text-[11px]">
                      {filled === 0
                        ? "Toca para registrar tu primera comida"
                        : `${totalKcal} kcal · ${totalCarbs} g carbos`}
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-sub" />
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {MEAL_ORDER.map((t) => {
                  const meal = meals.find((m) => m.type === t);
                  const Icon = MEAL_ICONS[t];
                  const color = MEAL_COLORS[t];
                  const done = !!meal;
                  return (
                    <div
                      key={t}
                      className="rounded-xl bg-card2 border border-black/[0.08] px-1.5 py-2 text-center relative"
                      style={done ? { borderColor: `${color}55`, backgroundColor: `${color}14` } : {}}
                    >
                      <div
                        className="w-7 h-7 mx-auto rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: done ? `${color}33` : "#E3E8F1",
                          color: done ? color : "#93A0B5",
                        }}
                      >
                        <Icon size={14} />
                      </div>
                      <p
                        className="text-[10px] font-extrabold mt-1"
                        style={{ color: done ? color : "#5B6B85" }}
                      >
                        {t}
                      </p>
                      {done && (
                        <span
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-teal text-bg flex items-center justify-center"
                          style={{ boxShadow: "0 0 0 2px #FFFFFF" }}
                        >
                          <Check size={9} strokeWidth={3.5} />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}
      </Card>

      <SectionTitle>Glucosa de hoy</SectionTitle>
      <Card>
        <div className="flex items-baseline justify-between">
          <div>
            <p className="text-sub text-[11px] uppercase tracking-wider font-bold">Actual</p>
            <p className="text-txt text-[24px] font-extrabold">
              {current} <span className="text-sub text-[12px] font-bold">mg/dL</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sub text-[11px] uppercase tracking-wider font-bold">Pico</p>
            <p className="text-brand-amber text-[18px] font-extrabold">
              {peak} <span className="text-sub text-[11px] font-bold">· {peakTime}</span>
            </p>
          </div>
        </div>
        <div className="mt-2">
          <Sparkline data={glucoseDay} color="#0284C7" highlightMaxLabel={`${peak}`} />
        </div>
      </Card>
    </div>
  );
}
