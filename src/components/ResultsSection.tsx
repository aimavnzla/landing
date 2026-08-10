import { kpis } from "../data/kpis";
import { KPICard } from "./KPICard";
import { CTAContextual } from "./CTAContextual";

export function ResultsSection() {
  return (
    <section id="resultados" className="relative scroll-mt-24 py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-aima-purple/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-aima-purple/30 bg-aima-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-aima-purple-light">
            Resultados reales
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Menos tiempo perdido,
            <br className="hidden sm:block" />
            más negocios cerrados
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/60">
            Métricas promedio de inmobiliarias que implementan AIMA. Sin aumentar equipo ni inversión en ads.
          </p>
        </div>

        <div data-reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((kpi) => (
            <KPICard key={kpi.id} kpi={kpi} />
          ))}
        </div>

        {/* CTA Contextual */}
        <div data-reveal className="mt-16">
          <CTAContextual variant="funnel" />
        </div>
      </div>
    </section>
  );
}