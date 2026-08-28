import Image from "next/image";

type TimelineStep = 0 | 1 | 2;
type WomenRightsTimelineSlideProps = { step: TimelineStep };
type WomenRightsTimelineRailProps = { activeStep: TimelineStep | null };

const timelineSlides = [
  {
    image: "/images/cabildo-mujer/series/18-linea-tiempo-derechos.png",
    kicker: "1955 — 1995 · CIUDADANÍA Y GARANTÍAS",
    title: "Los derechos abrieron el camino.",
    milestones: [
      {
        year: "1955",
        title: "Ciudadanía política",
        description:
          "Las mujeres conquistan el derecho al sufragio y participan por primera vez en una elección nacional en 1957.",
      },
      {
        year: "1982",
        title: "Igualdad constitucional",
        description:
          "El artículo 60 reconoce la igualdad ante la ley y declara punible la discriminación por sexo.",
      },
      {
        year: "1983 · 1995",
        title: "Compromisos internacionales",
        description:
          "Honduras ratifica la CEDAW y la Convención de Belém do Pará para combatir la discriminación y la violencia.",
      },
    ],
    source: "Fuentes: La Gaceta No. 15,503 · Constitución de la República · OHCHR · OEA/CIDH",
  },
  {
    image: "/images/cabildo-mujer/series/19-linea-tiempo-politicas.png",
    kicker: "1997 — 2000 · PROTECCIÓN E INSTITUCIONES",
    title: "La igualdad se convirtió en política pública.",
    milestones: [
      {
        year: "1997",
        title: "Protección frente a la violencia",
        description:
          "El Decreto 132-97 crea una ley específica para prevenir, sancionar y atender la violencia doméstica.",
      },
      {
        year: "1998–1999",
        title: "Una institución rectora",
        description:
          "El Decreto 232-98 crea el INAM para formular y coordinar la política pública dirigida a las mujeres.",
      },
      {
        year: "2000",
        title: "Igualdad de oportunidades",
        description:
          "El Decreto 34-2000 obliga al Estado a promover la igualdad en la vida social, económica y política.",
      },
    ],
    source: "Fuentes: La Gaceta · Tribunal Superior de Cuentas · INAM",
  },
  {
    image: "/images/cabildo-mujer/series/20-linea-tiempo-municipio.png",
    kicker: "2010 — 2026 · DEL ESTADO AL MUNICIPIO",
    title: "Los derechos llegaron al territorio.",
    milestones: [
      {
        year: "2010",
        title: "Una política nacional",
        description:
          "El II PIEGH organiza la acción pública para reducir brechas y hacer efectiva la igualdad de género.",
      },
      {
        year: "2026",
        title: "Recursos con destino definido",
        description:
          "El artículo 172 reserva el 5 % de las transferencias municipales para seis ejes de derechos de las mujeres.",
      },
      {
        year: "HOY",
        title: "Participación local",
        description:
          "La disposición exige cabildos abiertos para socializar las propuestas con las redes de mujeres del municipio.",
      },
    ],
    source: "Fuentes: Política Nacional de la Mujer — II PIEGH · Presupuesto General 2026, Decreto 62-2026",
    takeaway:
      "Por eso la atención municipal no es un gesto aislado: es el resultado de derechos conquistados, obligaciones legales y políticas que deben cumplirse en cada territorio.",
  },
] as const;

const timelineMilestones = timelineSlides.flatMap((timelineSlide, section) =>
  timelineSlide.milestones.map((milestone, index) => ({
    ...milestone,
    section,
    isOrigin: section === 0 && index === 0,
    isToday: section === timelineSlides.length - 1 && index === timelineSlide.milestones.length - 1,
  })),
);

export function WomenRightsTimelineSlide({ step }: WomenRightsTimelineSlideProps) {
  const slide = timelineSlides[step];
  const titleId = `women-rights-timeline-title-${step + 1}`;

  return (
    <section
      className={`information-slide timeline-slide timeline-slide--${step + 1}`}
      aria-labelledby={titleId}
    >
      <div className="information-visual" aria-hidden="true">
        <Image
          className="information-image timeline-image"
          src={slide.image}
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
        <span className="information-image-shade timeline-image-shade" />
      </div>

      <div className="information-content timeline-content">
        <p className="information-kicker">{slide.kicker}</p>
        <h1
          id={titleId}
          className="information-title title-ink title-ink--information"
          data-text={slide.title}
        >
          {slide.title}
        </h1>

        <div className="timeline-rail-placeholder" aria-hidden="true" />

        {"takeaway" in slide && <p className="timeline-takeaway">{slide.takeaway}</p>}
        <p className="timeline-source">{slide.source}</p>
      </div>
    </section>
  );
}

export function WomenRightsTimelineRail({ activeStep }: WomenRightsTimelineRailProps) {
  const visibleStep = activeStep ?? 0;

  return (
    <aside
      className={`persistent-timeline${activeStep === null ? "" : " is-visible"}`}
      aria-label="Línea del tiempo de los derechos de las mujeres"
      aria-hidden={activeStep === null}
    >
      <div className="timeline-rail-aligner">
        <div className="timeline-viewport">
          <div className={`timeline-track timeline-track--step-${visibleStep + 1}`}>
            {timelineMilestones.map((milestone) => (
              <article
                className={`timeline-milestone${milestone.section === visibleStep ? " is-active" : ""}${milestone.isOrigin ? " is-origin" : ""}${milestone.isToday ? " is-today" : ""}`}
                key={`${milestone.section}-${milestone.year}`}
                aria-hidden={milestone.section !== visibleStep}
              >
                <span className="timeline-milestone-dot" aria-hidden="true" />
                <time>{milestone.year}</time>
                <h2>{milestone.title}</h2>
                <p>{milestone.description}</p>
              </article>
            ))}
            <span className="timeline-range timeline-range--start" aria-hidden="true">1955</span>
            <span className="timeline-range timeline-range--end" aria-hidden="true">HOY</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
