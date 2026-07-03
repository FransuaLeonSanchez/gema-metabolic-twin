"use client";
import { useState } from "react";
import { Download, Share2, FileCheck2 } from "lucide-react";
import { TopBar } from "@/components/ui/TopBar";
import { Button } from "@/components/ui/Button";
import { Sparkline } from "@/components/charts/Sparkline";
import { glucoseDay, mockUser, mtsCriteria, projection5y, weekICM } from "@/lib/mockData";

interface Props {
  onBack: () => void;
}

export function DoctorReportScreen({ onBack }: Props) {
  const [toast, setToast] = useState<string | null>(null);
  const avgICM = Math.round(weekICM.reduce((a, b) => a + b.icm, 0) / weekICM.length);

  const show = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2200);
  };

  const today = new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="h-full overflow-y-auto scroll-hide px-5 pt-2 pb-[120px] relative">
      <TopBar title="Reporte médico" onBack={onBack} />

      <div className="bg-card text-txt rounded-[20px] p-4 border border-black/[0.08] shadow-card">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-hint font-bold">
              Reporte metabólico
            </p>
            <p className="text-[16px] font-extrabold">Gemelo Digital · Resumen semanal</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center">
            <FileCheck2 size={18} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3 text-[12px]">
          <Field label="Paciente" value={mockUser.name} />
          <Field label="Edad" value={`${mockUser.age} años`} />
          <Field label="Sexo" value={mockUser.sex} />
          <Field label="Cintura" value={`${mockUser.waist} cm`} />
          <Field label="Ciudad" value={mockUser.city} />
          <Field label="Fecha" value={today} />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <Tile label="ICM promedio" value={String(avgICM)} sub="esta semana" color="#D97706" />
          <Tile label="Tiempo en rango" value="68%" sub="meta 70%" color="#2563EB" />
          <Tile label="Pasos / día" value="6,420" sub="meta 7,000" color="#16A34A" />
          <Tile label="Sueño promedio" value="6.1 h" sub="meta 7 h" color="#7C3AED" />
        </div>

        <div className="mt-3">
          <p className="text-[10px] uppercase tracking-wider text-hint font-bold mb-1">
            Curva de glucosa (últimas 24 h)
          </p>
          <div className="bg-card rounded-xl p-2 border border-line">
            <Sparkline data={glucoseDay} color="#2563EB" highlightMaxLabel="162" showAxis={false} />
          </div>
        </div>

        {/* 5 criterios NCEP-ATP III */}
        <div className="mt-3">
          <p className="text-[10px] uppercase tracking-wider text-hint font-bold mb-1">
            Criterios diagnósticos (NCEP-ATP III)
          </p>
          <ul className="bg-card rounded-xl border border-line divide-y divide-line">
            {mtsCriteria.map((c) => (
              <li key={c.key} className="flex items-center justify-between px-3 py-1.5">
                <div>
                  <p className="text-[11px] font-bold text-txt">{c.key}</p>
                  <p className="text-[9px] text-hint">{c.threshold}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-extrabold text-txt tabular-nums">
                    {c.value}
                  </span>
                  <span
                    className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: c.altered ? "#E11D481f" : "#16A34A1f",
                      color: c.altered ? "#E11D48" : "#16A34A",
                    }}
                  >
                    {c.altered ? "ALTERADO" : "OK"}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-hint mt-1.5 leading-snug">
            {mtsCriteria.filter((c) => c.altered).length} de 5 alterados ·{" "}
            <span className="font-bold text-txt">
              Pre-síndrome metabólico (riesgo creciente).
            </span>
          </p>
        </div>

        {/* Laboratorio + índices */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Tile label="HbA1c" value={`${mockUser.labs.hba1c}%`} sub="≥ 5.7 alerta" color="#D97706" />
          <Tile label="TyG" value={mockUser.labs.tyg.toFixed(2)} sub="proxy insulina" color="#7C3AED" />
          <Tile label="HRV" value={`${mockUser.labs.hrv} ms`} sub="estrés alto" color="#E11D48" />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl p-2 bg-brand-red/10 border border-brand-red/25">
            <p className="text-[10px] uppercase font-bold text-brand-red">Riesgo 5 años</p>
            <p className="text-[18px] font-extrabold text-brand-red">{projection5y.current}%</p>
            <p className="text-[10px] text-brand-red">camino actual</p>
          </div>
          <div className="rounded-xl p-2 bg-brand-teal/10 border border-brand-teal/25">
            <p className="text-[10px] uppercase font-bold text-brand-teal">Con plan</p>
            <p className="text-[18px] font-extrabold text-brand-teal">{projection5y.withPlan}%</p>
            <p className="text-[10px] text-brand-teal">objetivo del gemelo</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-line flex items-center justify-between text-[10px] text-hint">
          <span>Generado por Gemelo Digital Metabólico</span>
          <span className="font-bold">{today}</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <Button icon={<Download size={16} />} onClick={() => show("Reporte descargado")}>
          Descargar PDF
        </Button>
        <Button
          variant="ghost"
          icon={<Share2 size={16} />}
          onClick={() => show("Reporte compartido")}
        >
          Compartir con mi médico
        </Button>
      </div>

      {toast && (
        <div className="absolute bottom-[110px] left-1/2 -translate-x-1/2 bg-card border border-brand-teal/40 rounded-full px-4 py-2 text-brand-teal text-[12px] font-extrabold">
          ✓ {toast}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-hint font-bold">{label}</p>
      <p className="text-txt font-bold">{value}</p>
    </div>
  );
}

function Tile({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-2 border"
      style={{ backgroundColor: `${color}1A`, borderColor: `${color}55` }}
    >
      <p className="text-[10px] uppercase font-bold text-hint">{label}</p>
      <p className="text-[16px] font-extrabold" style={{ color }}>
        {value}
      </p>
      <p className="text-[10px] text-hint">{sub}</p>
    </div>
  );
}
