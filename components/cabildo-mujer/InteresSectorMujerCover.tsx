import Image from "next/image";

export function InteresSectorMujerCover() {
  return (
    <section className="information-slide interes-cover" aria-labelledby="interes-cover-title">
      <div className="information-visual" aria-hidden="true">
        <Image
          className="information-image interes-cover-image"
          src="/images/cabildo-mujer/series/02-hombro-mariposa.png"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
        <span className="information-image-shade" />
      </div>

      <div className="information-content interes-cover-content">
        <p className="information-kicker">NUESTRO COMPROMISO</p>
        <h1
          id="interes-cover-title"
          className="information-title interes-cover-title title-ink title-ink--information"
          data-text="¿Por qué priorizamos a las mujeres?"
        >
          ¿Por qué priorizamos a las mujeres?
        </h1>
        <span className="interes-cover-rule" aria-hidden="true" />
        <p className="interes-cover-caption">
          Porque todavía enfrentan mayores dificultades y apoyarlas mejora la vida de todo el
          municipio.
        </p>
      </div>
    </section>
  );
}
