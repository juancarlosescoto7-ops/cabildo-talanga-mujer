"use client";

import Image from "next/image";
import { type CSSProperties } from "react";
import { AxisPhotoCarousel } from "./AxisPhotoCarousel";
import { formatLempiras, officeWomanReport } from "@/data/oficina-mujer-report";
import { useFinancialData } from "@/hooks/use-financial-data";
import { financialAxisSlugByIndex } from "@/lib/financial-data";
import { CountUpText } from "./CountUpText";

export function EjeFinancieroSlide({ activeAxis }: { activeAxis: number }) {
  const axis = officeWomanReport.axes[activeAxis];
  const liveData = useFinancialData();
  const liveAmounts = liveData?.axes[financialAxisSlugByIndex[activeAxis]];
  const amounts = liveAmounts ?? axis;
  const executionRate = amounts.budget
    ? amounts.executed / amounts.budget * 100
    : null;
  const available = amounts.budget - amounts.executed - amounts.committed;
  const money = (value: number | null) => value === null ? "Sin dato" : formatLempiras(value);

  return <section className="information-slide axis-report-slide" aria-labelledby="axis-financial-title">
    <div className="information-visual" aria-hidden="true">
      <Image className="information-image axis-report-background" src={axis.background} alt="" fill loading="eager" sizes="100vw" />
      <span className="information-image-shade axis-report-shade" />
    </div>
    <div className="axis-report-layout">
      <header className="axis-report-header">
        <p className="information-kicker">RESULTADOS DEL EJE · {liveData?.fiscalYear ?? officeWomanReport.fiscalYear}</p>
        <div><span style={{ color: axis.color }}><CountUpText value={axis.percentage} /></span><h1 id="axis-financial-title">{axis.name}</h1></div>
        <h2>{axis.headline}</h2>
        <p>{axis.summary}</p>
      </header>
      <div className="axis-report-finance">
        <article><span>Presupuesto del eje</span><strong><CountUpText value={money(amounts.budget)} /></strong></article>
        <article><span>Ejecutado</span><strong><CountUpText value={money(amounts.executed)} /></strong>{executionRate !== null && <small><CountUpText value={`${executionRate.toFixed(1)} %`} /> del presupuesto</small>}</article>
        <article><span>Comprometido</span><strong><CountUpText value={money(amounts.committed)} /></strong></article>
        <article><span>Disponible</span><strong><CountUpText value={money(available)} /></strong></article>
      </div>
      <div className="axis-report-goals">
        <div className="axis-goal-ring" style={{ "--goal-rate": `${(executionRate ?? 0) * 3.6}deg`, "--axis-color": axis.color } as CSSProperties}><strong><CountUpText value={executionRate === null ? "—" : `${executionRate.toFixed(0)}%`} /></strong></div>
        <div><span>Ejecución presupuestaria</span><strong><CountUpText value={executionRate === null ? "Sin dato" : `${executionRate.toFixed(1)} %`} /></strong><p>{executionRate === null ? "Sin información financiera." : <><CountUpText value={money(amounts.executed)} /> ejecutados.</>}</p></div>
      </div>
      <AxisPhotoCarousel photos={axis.photos} color={axis.color} />
    </div>
  </section>;
}
