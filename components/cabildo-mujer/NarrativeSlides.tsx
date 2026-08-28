"use client";

import Image from "next/image";
import { formatLempiras, officeWomanReport } from "@/data/oficina-mujer-report";
import { useFinancialData } from "@/hooks/use-financial-data";
import { CountUpText } from "./CountUpText";

const axes = ["Economía", "Vida libre de violencia", "Salud", "Participación", "Educación", "Ambiente"];

function NarrativeBackground({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className="information-visual" aria-hidden="true">
      <Image className={`information-image ${className}`} src={src} alt="" fill loading="eager" sizes="100vw" />
      <span className="information-image-shade" />
    </div>
  );
}

export function HumanOpeningSlide() {
  return (
    <section className="information-slide narrative-slide human-opening-slide" aria-labelledby="human-opening-title">
      <NarrativeBackground src="/images/cabildo-mujer/series/07-giro-movimiento.png" className="human-opening-image" />
      <div className="information-content narrative-content narrative-content--opening">
        <p className="information-kicker">EL PUNTO DE PARTIDA</p>
        <h1 id="human-opening-title" className="information-title title-ink title-ink--information" data-text="Cada mujer de Talanga debería poder avanzar.">Cada mujer de Talanga debería poder avanzar.</h1>
        <p className="information-lead">Vivir segura. Generar sus propios ingresos. Cuidar su salud. Participar en las decisiones que afectan su vida.</p>
        <p className="interes-detail">Hoy nos reunimos para reconocer lo avanzado, rendir cuentas y decidir juntas lo que todavía debemos transformar.</p>
      </div>
    </section>
  );
}

export function RoadmapSlide() {
  return (
    <section className="information-slide narrative-slide roadmap-slide" aria-labelledby="roadmap-title">
      <NarrativeBackground src="/images/cabildo-mujer/series/09-motivo-tejido-colectivo.png" className="roadmap-image" />
      <div className="information-content narrative-content narrative-content--roadmap">
        <p className="information-kicker">LA PREGUNTA QUE NOS GUÍA</p>
        <h1 id="roadmap-title" className="information-title title-ink title-ink--information" data-text="¿Qué tiene que cambiar para que todas puedan avanzar?">¿Qué tiene que cambiar para que todas puedan avanzar?</h1>
        <p className="information-lead roadmap-axis-line" aria-label="Seis ejes de trabajo">{axes.join(" · ")}</p>
      </div>
    </section>
  );
}

export function CommitmentSummarySlide() {
  const liveData = useFinancialData();
  const fallbackTotals = officeWomanReport.axes.reduce((totals, axis) => ({
    budget: totals.budget + axis.budget,
    executed: totals.executed + axis.executed,
    committed: totals.committed + axis.committed,
  }), { budget: 0, executed: 0, committed: 0 });
  const totals = liveData?.totals.budget ? liveData.totals : fallbackTotals;
  const available = totals.budget - totals.executed - totals.committed;

  return (
    <section className="information-slide narrative-slide commitment-summary-slide" aria-labelledby="commitment-summary-title">
      <NarrativeBackground src="/images/cabildo-mujer/series/10-razones-inversion-mujer.png" className="commitment-summary-image" />
      <div className="information-content narrative-content narrative-content--summary">
        <p className="information-kicker">BALANCE Y PRÓXIMO COMPROMISO</p>
        <h1 id="commitment-summary-title" className="information-title title-ink title-ink--information" data-text="Lo avanzado importa. Lo que falta nos compromete.">Lo avanzado importa. Lo que falta nos compromete.</h1>
        <div className="motivo-points narrative-summary-points">
          <article className="motivo-point"><span className="motivo-number">01 · ALCANCE</span><h2><CountUpText value="6 ejes · 18 acciones" /></h2><p>Una atención integral que ya se convierte en actividades documentadas.</p></article>
          <article className="motivo-point"><span className="motivo-number">02 · AVANCE FINANCIERO</span><h2><CountUpText value={formatLempiras(totals.executed)} /> ejecutados</h2><p><CountUpText value={formatLempiras(totals.committed)} /> adicionales ya se encuentran comprometidos.</p></article>
          <article className="motivo-point"><span className="motivo-number">03 · LO QUE SIGUE</span><h2><CountUpText value={formatLempiras(available)} /> disponibles</h2><p>Recursos por convertir en nuevas acciones y resultados.</p></article>
        </div>
        <p className="interes-detail">El saldo disponible no es solamente una cifra pendiente: representa oportunidades que todavía debemos hacer realidad.</p>
      </div>
    </section>
  );
}

export function ListeningSlide() {
  const questions = [
    "¿Cuál es hoy la necesidad más urgente de las mujeres de su comunidad?",
    "¿Qué acción municipal debería priorizarse con los recursos disponibles?",
    "¿Cómo podemos verificar juntas que los compromisos se cumplan?",
  ];
  return (
    <section className="information-slide narrative-slide listening-slide" aria-labelledby="listening-title">
      <NarrativeBackground src="/images/cabildo-mujer/series/11-apoyo-colectivo-mujeres.png" className="listening-image" />
      <div className="information-content narrative-content narrative-content--listening">
        <p className="information-kicker">EL CABILDO CONTINÚA CON USTEDES</p>
        <h1 id="listening-title" className="information-title title-ink title-ink--information" data-text="Ahora queremos escucharles.">Ahora queremos escucharles.</h1>
        <p className="information-lead">Las próximas decisiones deben partir de la experiencia y las prioridades de las mujeres de Talanga.</p>
        <div className="motivo-points narrative-question-points">{questions.map((question, index) => <article className="motivo-point" key={question}><span className="motivo-number">0{index + 1}</span><h2>{question}</h2></article>)}</div>
        <p className="interes-detail">Su voz no cierra este cabildo. Su voz abre lo que sigue.</p>
      </div>
    </section>
  );
}

export function FinalMessageSlide() {
  return (
    <section className="information-slide narrative-slide final-message-slide" aria-labelledby="final-message-title">
      <NarrativeBackground src="/images/cabildo-mujer/series/08-perfil-luz-coral.png" className="final-message-image" />
      <div className="information-content narrative-content narrative-content--final">
        <p className="information-kicker">III CABILDO ABIERTO · SECTOR MUJER</p>
        <h1 id="final-message-title" className="information-title title-ink title-ink--information" data-text="Talanga avanza cuando sus mujeres avanzan.">Talanga avanza cuando sus mujeres avanzan.</h1>
        <span className="interes-cover-rule" aria-hidden="true" />
        <p className="interes-cover-caption">Compromiso · Participación · Resultados</p>
      </div>
    </section>
  );
}
