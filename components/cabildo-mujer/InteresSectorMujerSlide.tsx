import Image from "next/image";
import { CountUpText } from "./CountUpText";

type InteresSectorMujerSlideProps = { step: 0 | 1 | 2 };

const slides = [
  {
    image: "/images/cabildo-mujer/series/03-espalda-silueta.png",
    kicker: "EXISTEN DESIGUALDADES",
    title: "No todas parten de las mismas oportunidades",
    lead: "Muchas mujeres tienen menos oportunidades de empleo e ingresos, asumen la mayor parte del cuidado del hogar y enfrentan más riesgos de violencia.",
    detail: "Por eso necesitan programas y servicios que les permitan vivir con seguridad, generar sus propios ingresos, cuidar su salud y participar en las decisiones del municipio.",
  },
  {
    image: "/images/cabildo-mujer/series/04-manos-tejido.png",
    kicker: "EL BENEFICIO ES PARA TODOS",
    title: "Apoyar a las mujeres fortalece al municipio",
    lead: "Cuando una mujer tiene seguridad, salud, formación y oportunidades para producir, también mejoran las condiciones de su familia y de su comunidad.",
    detail: "Invertir en prevención de violencia, emprendimiento, educación, salud y liderazgo ayuda a construir un municipio más seguro, productivo y justo para todas las personas.",
  },
  {
    image: "/images/cabildo-mujer/series/05-cabello-mariposas.png",
    kicker: "LA LEY ASIGNA RECURSOS",
    title: "El 5 % debe invertirse en las mujeres",
    lead: "Las disposiciones del presupuesto nacional indican que la municipalidad debe destinar el 5 % de su transferencia a programas, proyectos y servicios para las mujeres.",
    detail: "Estos fondos deben usarse con planificación y transparencia, atendiendo las necesidades expresadas por las mujeres del municipio y mostrando resultados concretos.",
  },
] as const;

export function InteresSectorMujerSlide({ step }: InteresSectorMujerSlideProps) {
  const slide = slides[step];
  const titleId = `interes-mujer-title-${step + 1}`;

  return (
    <section className={`information-slide interes-mujer-slide interes-mujer-slide--${step + 1}`} aria-labelledby={titleId}>
      <div className="information-visual" aria-hidden="true">
        <Image className="information-image interes-mujer-image" src={slide.image} alt="" fill loading="eager" sizes="100vw" />
        <span className="information-image-shade" />
      </div>

      <div className="information-content interes-mujer-content">
        <p className="information-kicker">{slide.kicker}</p>
        <h1 id={titleId} className="information-title title-ink title-ink--information" data-text={slide.title}>{slide.title}</h1>
        <p className="information-lead">{slide.lead}</p>

        {step === 2 && (
          <div className="allocation-graphic" aria-label="Cinco por ciento de la transferencia municipal destinado al Programa Atención a la Mujer">
            <div className="allocation-ring" aria-hidden="true"><span><CountUpText value="5 %" /></span></div>
            <div className="allocation-copy">
              <strong>de la transferencia municipal</strong>
              <span>pertenece al Programa Atención a la Mujer</span>
            </div>
          </div>
        )}

        <p className="interes-detail">{slide.detail}</p>
      </div>
    </section>
  );
}
