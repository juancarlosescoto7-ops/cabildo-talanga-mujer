import Image from "next/image";

const sceneImages = [
  {
    src: "/images/cabildo-mujer/series/08-perfil-luz-coral.png",
    phase: "logo",
  },
  {
    src: "/images/cabildo-mujer/series/02-hombro-mariposa.png",
    phase: "cabildo",
  },
  {
    src: "/images/cabildo-mujer/series/06-flores-espalda.png",
    phase: "mujer",
  },
] as const;

export function EditorialVisual() {
  return (
    <div className="editorial-visual" aria-hidden="true">
      {sceneImages.map((image, index) => (
        <div
          key={image.phase}
          className={`scene-image scene-image--${index + 1} intro-photo intro-photo--${image.phase}`}
        >
          <Image
            className="scene-image-asset"
            src={image.src}
            alt=""
            fill
            preload={index === 0}
            sizes="100vw"
          />
          <span className="scene-image-shade" />
        </div>
      ))}
      <span className="editorial-glow" />
    </div>
  );
}
