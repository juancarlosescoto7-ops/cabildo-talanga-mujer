import Image from "next/image";
import { CountUpText } from "./CountUpText";

type MarcoLegalSlideProps = {
  sharedChartEntry?: boolean;
};

export function MarcoLegalSlide({
  sharedChartEntry = false,
}: MarcoLegalSlideProps) {
  const slideClasses = [
    "information-slide legal-slide",
    sharedChartEntry ? "legal-slide--shared-chart" : "",
  ].filter(Boolean).join(" ");

  return (
    <section
      className={slideClasses}
      aria-labelledby="legal-slide-title"
    >
      <div className="information-visual" aria-hidden="true">
        <Image
          className="information-image legal-slide-image"
          src="/images/cabildo-mujer/series/06-flores-espalda.png"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
        <span className="information-image-shade legal-image-shade" />
      </div>

      <div className="legal-layout">
        <div className="legal-copy">
          <p className="information-kicker">LA BASE LEGAL</p>
          <h1
            id="legal-slide-title"
            className="information-title title-ink title-ink--information"
            data-text="El compromiso también se cumple con la ley"
          >
            El compromiso también se cumple con la ley
          </h1>
          <p className="information-lead">
            La ley no solo reserva el 5 % para las mujeres; también señala cómo debe distribuirse
            para atender sus principales necesidades.
          </p>
          <p className="legal-reference">
            Artículo 172 · Presupuesto General 2026 · Decreto 62-2026
          </p>
        </div>

        <div className="legal-chart-panel">
          <div className="legal-chart" aria-label="Distribución interna del cinco por ciento destinado a las mujeres">
            <div className="legal-chart-ring" aria-hidden="true">
              <span className="legal-chart-message legal-chart-message--five">
                <span className="legal-typed legal-typed--intro">Este es el</span>
                <strong><CountUpText value="5 %" /></strong>
              </span>
              <span className="legal-chart-message legal-chart-message--total">
                <span className="legal-typed legal-typed--total-lead">Este 5 % pasa a ser</span>
                <strong className="legal-typed legal-typed--total-value">nuestro <CountUpText value="100 %" /></strong>
              </span>
              <span className="legal-chart-message legal-chart-message--split">
                <span className="legal-typed legal-typed--split-lead">Y este <CountUpText value="100 %" /></span>
                <strong className="legal-typed legal-typed--split-value">se distribuye así</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
