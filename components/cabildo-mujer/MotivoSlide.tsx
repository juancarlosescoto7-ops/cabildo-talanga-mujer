import Image from "next/image";

export function MotivoSlide() {
  return (
    <section className="information-slide motivo-slide" aria-labelledby="motivo-title">
      <div className="information-visual" aria-hidden="true">
        <Image
          className="information-image"
          src="/images/cabildo-mujer/series/01-nuca-perfil.png"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
        />
        <span className="information-image-shade" />
      </div>

      <div className="information-content">
        <h1
          id="motivo-title"
          className="information-title title-ink title-ink--information"
          data-text="Este espacio existe para escuchar, decidir y actuar"
        >
          Este espacio existe para escuchar, decidir y actuar
        </h1>

        <p className="information-lead">
          El Cabildo Abierto de la Mujer es el espacio donde las mujeres de Talanga expresan sus
          necesidades, conocen cómo se utilizan los recursos públicos y participan en la definición
          de las próximas acciones municipales.
        </p>
      </div>
    </section>
  );
}
