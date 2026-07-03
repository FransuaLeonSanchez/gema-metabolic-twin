"use client";
import { TopBar } from "@/components/ui/TopBar";
import { Card } from "@/components/ui/Card";
import { DualLine } from "@/components/charts/DualLine";
import { projection5y } from "@/lib/mockData";

interface Props {
  onBack: () => void;
}

export function Projection5yScreen({ onBack }: Props) {
  return (
    <div className="h-full overflow-y-auto scroll-hide px-5 pt-2 pb-[100px]">
      <TopBar title="Proyección 5 años" onBack={onBack} />

      <p className="text-sub text-[13px] leading-snug mb-3">
        Tu gemelo proyecta cómo evolucionaría tu riesgo de diabetes tipo 2 según el camino
        que elijas.
      </p>

      <Card>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sub text-[12px] uppercase tracking-wider font-bold">
            Riesgo a 5 años
          </p>
          <div className="flex items-center gap-3 text-[11px] font-bold">
            <span className="flex items-center gap-1 text-brand-red">
              <span className="w-2 h-2 rounded-full bg-brand-red" /> Sin cambios
            </span>
            <span className="flex items-center gap-1 text-brand-teal">
              <span className="w-2 h-2 rounded-full bg-brand-teal" /> Con plan
            </span>
          </div>
        </div>
        <DualLine
          labels={["Hoy", "+1a", "+2a", "+3a", "+5a"]}
          series={[
            { data: projection5y.noChange, color: "#E11D48", label: "Sin cambios" },
            { data: projection5y.plan,     color: "#0D9488", label: "Con plan" },
          ]}
        />
      </Card>

      <div className="mt-3 space-y-3">
        <Card accent="#E11D48">
          <p className="text-brand-red text-[12px] font-extrabold uppercase tracking-wider inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red shadow-[0_0_8px_#E11D48]" />
            Camino actual
          </p>
          <p className="text-txt text-[14px] font-extrabold mt-1">
            Riesgo sube a {projection5y.noChange[projection5y.noChange.length - 1]}%
          </p>
          <p className="text-sub text-[12px] mt-1 leading-snug">
            Diabetes tipo 2 probable, riesgo cardiovascular elevado, posible medicación de
            por vida.
          </p>
        </Card>

        <Card accent="#0D9488">
          <p className="text-brand-teal text-[12px] font-extrabold uppercase tracking-wider inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-teal shadow-[0_0_8px_#0D9488]" />
            Con tu plan
          </p>
          <p className="text-txt text-[14px] font-extrabold mt-1">
            Riesgo baja a {projection5y.plan[projection5y.plan.length - 1]}%
          </p>
          <p className="text-sub text-[12px] mt-1 leading-snug">
            Riesgo metabólico controlado, sin medicación, mejor energía y descanso.
          </p>
        </Card>
      </div>

      <div
        className="mt-5 rounded-[20px] border border-black/[0.08] p-4 text-center shadow-card"
        style={{
          background:
            "radial-gradient(120% 140% at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 60%), linear-gradient(180deg, #EEF3FB 0%, #FFFFFF 100%)",
        }}
      >
        <p className="text-txt text-[14px] font-extrabold leading-snug">
          Tu gemelo te muestra dos futuros.
        </p>
        <p
          className="text-[14px] font-extrabold bg-clip-text text-transparent inline-block"
          style={{ backgroundImage: "linear-gradient(120deg, #2563EB, #7C3AED)" }}
        >
          Tú eliges cuál vivir.
        </p>
      </div>
    </div>
  );
}
