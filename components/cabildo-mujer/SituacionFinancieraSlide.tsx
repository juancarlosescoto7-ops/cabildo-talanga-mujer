"use client";

import Image from "next/image";
import { formatLempiras, officeWomanReport } from "@/data/oficina-mujer-report";
import { useFinancialData } from "@/hooks/use-financial-data";
import { CountUpText } from "./CountUpText";

const fallbackTotals = officeWomanReport.axes.reduce((totals, axis) => ({
  budget: totals.budget + axis.budget,
  executed: totals.executed + axis.executed,
  committed: totals.committed + axis.committed,
}), { budget: 0, executed: 0, committed: 0 });

export function SituacionFinancieraSlide() {
  const liveData = useFinancialData();
  const totals = liveData?.totals.budget ? liveData.totals : fallbackTotals;
  const available = totals.budget - totals.executed - totals.committed;
  const percentage = (value: number) => totals.budget ? value / totals.budget * 100 : 0;
  const executionRate = percentage(totals.executed);
  const committedRate = percentage(totals.committed);
  const availableRate = percentage(available);
  const plottedExecutionRate = Math.min(100, Math.max(0, executionRate));
  const plottedCommittedRate = Math.min(100 - plottedExecutionRate, Math.max(0, committedRate));
  const plottedAvailableRate = Math.max(0, 100 - plottedExecutionRate - plottedCommittedRate);

  return (
    <section className="information-slide financial-slide" aria-labelledby="financial-title">
      <div className="information-visual" aria-hidden="true">
        <Image
          className="information-image financial-image"
          src="/images/cabildo-mujer/series/12-eje-economia.png"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
        <span className="information-image-shade financial-shade" />
      </div>

      <div className="financial-content">
        <p className="information-kicker">SITUACIÓN FINANCIERA · TALANGA / MUJER</p>
        <p className="financial-program">Programa Atención a la Mujer · Ejercicio {liveData?.fiscalYear ?? officeWomanReport.fiscalYear} · Fuente: Supabase / transferencias</p>
        <h1 id="financial-title">El compromiso ya tiene una cifra.</h1>

        <div className="financial-metrics" aria-label="Resumen financiero del programa">
          <article className="financial-metric financial-metric--allowed">
            <span>Fondo permitido · 5 %</span>
            <strong><CountUpText value={formatLempiras(totals.budget)} /></strong>
            <p>El límite financiero del programa según los ingresos registrados.</p>
          </article>
          <article className="financial-metric financial-metric--committed">
            <span>Comprometido</span>
            <strong><CountUpText value={formatLempiras(totals.committed)} /></strong>
            <p>Recursos reservados para obligaciones en trámite.</p>
          </article>
          <article className="financial-metric financial-metric--executed">
            <span>Ejecutado</span>
            <strong><CountUpText value={formatLempiras(totals.executed)} /></strong>
            <p>Gasto que ya fue registrado en el programa.</p>
          </article>
          <article className="financial-metric financial-metric--available">
            <span>Disponible</span>
            <strong><CountUpText value={formatLempiras(available)} /></strong>
            <p>Saldo proyectado después de restar lo ejecutado y comprometido.</p>
          </article>
        </div>

        <div className="financial-progress-block">
          <div className="financial-progress-heading">
            <div>
              <span>Composición del fondo financiero</span>
              <p>Así se distribuye el 5 % entre lo ejecutado, lo comprometido y el saldo proyectado.</p>
            </div>
            <strong><small>Ejecución</small><CountUpText value={`${executionRate.toFixed(2)} %`} /></strong>
          </div>
          <div className="financial-progress-track" role="img" aria-label={`${executionRate.toFixed(2)} por ciento ejecutado, ${committedRate.toFixed(2)} por ciento comprometido y ${availableRate.toFixed(2)} por ciento disponible`}>
            <span className="financial-progress-segment financial-progress-segment--executed" style={{ width: `${plottedExecutionRate}%` }} />
            <span className="financial-progress-segment financial-progress-segment--committed" style={{ width: `${plottedCommittedRate}%` }} />
            <span className="financial-progress-segment financial-progress-segment--available" style={{ width: `${plottedAvailableRate}%` }} />
            <span className="financial-progress-marker" style={{ left: `${plottedExecutionRate}%` }} aria-hidden="true" />
          </div>
          <div className="financial-progress-values">
            <p><span>Ejecutado</span><strong><CountUpText value={`${executionRate.toFixed(2)} %`} /></strong></p>
            <p><span>Comprometido</span><strong><CountUpText value={`${committedRate.toFixed(2)} %`} /></strong></p>
            <p><span>Disponible</span><strong><CountUpText value={`${availableRate.toFixed(2)} %`} /></strong></p>
          </div>
        </div>
      </div>
    </section>
  );
}
