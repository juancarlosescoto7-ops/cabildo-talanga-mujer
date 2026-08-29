"use client";

import Image from "next/image";
import { officeWomanReport } from "@/data/oficina-mujer-report";
import { CountUpText } from "./CountUpText";

export function EjeActividadesSlide({ activeAxis }: { activeAxis: number }) {
  const axis = officeWomanReport.axes[activeAxis];
  const actionCount = axis.activities.length;
  const documentedActionsLabel = actionCount === 1
    ? "ACCIÓN DOCUMENTADA"
    : "ACCIONES DOCUMENTADAS";

  return (
    <section className="information-slide axis-activities-slide" aria-labelledby="axis-activities-title">
      <div className="information-visual" aria-hidden="true">
        <Image
          className="information-image axis-activities-background"
          src={axis.background}
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
        <span className="information-image-shade axis-activities-shade" />
      </div>

      <div className="axis-activities-layout">
        <header className="axis-activities-header">
          <p className="information-kicker"><CountUpText value={actionCount} /> {documentedActionsLabel} · EJE {activeAxis + 1}</p>
          <div className="axis-activities-title-row">
            <div className="axis-activities-reach">
              <strong style={{ color: axis.color }}><CountUpText value={axis.beneficiaries} /></strong>
              <span>alcances reportados</span>
            </div>
            <h1 id="axis-activities-title">{axis.name}</h1>
            <p>Acciones que convierten el compromiso municipal en acompañamiento, oportunidades y resultados visibles.</p>
          </div>
        </header>

        <div className={`axis-activities-grid axis-activities-grid--${Math.min(actionCount, 3)}-columns axis-activities-grid--${actionCount}-items`}>
          {axis.activities.map((activity, index) => (
            <article className="axis-activity-card" key={activity.title}>
              <div className="axis-activity-card-heading">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong style={{ color: axis.color }}><CountUpText value={activity.reach} /></strong>
              </div>
              <h2>{activity.title}</h2>
              <p>{activity.description}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
