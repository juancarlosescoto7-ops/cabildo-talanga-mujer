import Image from "next/image";
import type { CSSProperties } from "react";
import { officeWomanReport } from "@/data/oficina-mujer-report";

export function EjeTestimonioSlide({ activeAxis }: { activeAxis: number }) {
  const axis = officeWomanReport.axes[activeAxis];
  const representative = axis.representative;

  if (!representative) return null;

  const representativeMark = representative.names.length > 1
    ? "VOCES"
    : representative.names[0].split(" ").slice(0, 2).map((name) => name[0]).join("");
  const titleId = `axis-testimony-title-${activeAxis}`;

  return (
    <section className="information-slide axis-testimony-slide" aria-labelledby={titleId}>
      <div className="information-visual" aria-hidden="true">
        <Image
          className="information-image axis-testimony-image"
          src={representative.testimonyBackground}
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
        <span className="information-image-shade axis-testimony-shade" />
      </div>

      <div className="axis-testimony-layout">
        <p className="information-kicker">LA VOZ DEL EJE · {axis.name}</p>
        <article className={`axis-testimony-stage axis-testimony-stage--${representative.names.length}-voices`} style={{ "--representative-color": axis.color } as CSSProperties}>
          <div className="axis-testimony-seal" aria-hidden="true">{representativeMark}</div>
          <div className="axis-testimony-identity">
            <p className="axis-testimony-live"><span aria-hidden="true" /> Momento de testimonio</p>
            <h1 id={titleId}>
              {representative.names.map((name) => (
                <span className="axis-testimony-name" key={name}>{name}</span>
              ))}
            </h1>
            <span>{representative.label} · {representative.role}</span>
          </div>
          <div className="axis-testimony-prompt">
            <strong>{representative.names.length > 1 ? "Ahora tienen la palabra" : "Ahora tiene la palabra"}</strong>
            <p>{representative.story}</p>
            <div className="axis-testimony-wave" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          </div>
        </article>
        <p className="axis-testimony-note">La presentación hace una pausa para escuchar su experiencia en primera persona.</p>
      </div>
    </section>
  );
}
