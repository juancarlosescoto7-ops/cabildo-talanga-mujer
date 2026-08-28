export function IntroOverlay() {
  return (
    <div className="intro-overlay">
      <section className="intro-phase intro-logo-phase" aria-hidden="true">
        <span
          className="municipal-logo-gradient"
          role="img"
          aria-label="Logo de la Municipalidad de Talanga"
        />
      </section>

      <section className="intro-phase intro-cabildo-phase" aria-hidden="true">
        <div className="cover-event">
          <span className="cabildo-number title-ink title-ink--number" data-text="III">
            III
          </span>
          <h2
            className="cabildo-title title-ink title-ink--cabildo"
            data-text="CABILDO ABIERTO"
          >
            CABILDO ABIERTO
          </h2>
        </div>
      </section>

      <section className="intro-phase intro-mujer-phase" aria-hidden="true">
        <h1 className="mujer-title cover-subject title-ink title-ink--mujer" data-text="MUJER">
          MUJER
        </h1>
      </section>

      <p className="sr-only">III Cabildo Abierto Sector Mujer</p>
    </div>
  );
}
