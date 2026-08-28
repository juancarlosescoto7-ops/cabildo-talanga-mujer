"use client";

import Image from "next/image";
import { CountUpText } from "./CountUpText";

export const axes = [
  {
    name: "Economía", percentage: "30 %", color: "#f07167", background: "/images/cabildo-mujer/series/12-eje-economia.png",
    summary: "Que el trabajo de sus manos también abra camino a su propia autonomía.", problemStat: "40 %",
    problem: "es la tasa de participación laboral de las mujeres, frente al 74.6 % de los hombres.", source: "CNBS, con datos del INE · 2023",
    provision: "Destina el 30 % a iniciativas económicas y servicios municipales de cuidado que compartan responsabilidades.",
    commitment: "Impulsaremos oportunidades productivas y cuidados que devuelvan tiempo y autonomía.",
  },
  {
    name: "Prevención de violencia", percentage: "20 %", color: "#d986bd", background: "/images/cabildo-mujer/series/13-eje-prevencion-violencia.png",
    summary: "Que ninguna mujer camine sola cuando necesita protección.", problemStat: "1 de cada 2",
    problem: "mujeres de 15 años o más ha vivido violencia alguna vez en su vida.", source: "INE · ENESVMN 2022",
    provision: "Destina el 20 % a prevención y atención: formación, campañas, redes de apoyo y respaldo a casas refugio.",
    commitment: "Fortaleceremos rutas de atención y redes locales para que ninguna mujer enfrente sola la violencia.",
  },
  {
    name: "Salud", percentage: "20 %", color: "#a86aa4", background: "/images/cabildo-mujer/series/14-eje-salud.png",
    summary: "Cuidar cada etapa de la vida es reconocer un derecho completo.", problemStat: "22.9 %",
    problem: "de las hondureñas de 15 a 19 años ha estado alguna vez embarazada.", source: "UNFPA, con datos ENDESA/MICS · 2019",
    provision: "Destina el 20 % a salud integral, sexual y reproductiva, enfermedades crónicas e información sobre derechos.",
    commitment: "Acercaremos información, prevención y atención integral para acompañar cada etapa de la vida.",
  },
  {
    name: "Participación", percentage: "10 %", color: "#f2aaa0", background: "/images/cabildo-mujer/series/15-eje-participacion.png",
    summary: "Una comunidad cambia cuando las mujeres también deciden su rumbo.", problemStat: "7 %",
    problem: "de las alcaldías del país son lideradas por mujeres tras las elecciones generales de 2025.", source: "PNUD, con datos del CNE · 2026",
    provision: "Destina el 10 % a fortalecer la participación social, económica y política de las mujeres.",
    commitment: "Abriremos espacios para que las mujeres organicen, propongan y decidan junto a su comunidad.",
  },
  {
    name: "Educación", percentage: "10 %", color: "#81527d", background: "/images/cabildo-mujer/series/16-eje-educacion.png",
    summary: "Aprender abre puertas que la desigualdad mantuvo cerradas.", problemStat: "72 %",
    problem: "de la población joven que no estudia ni trabaja son mujeres.", source: "INE · EPHPM 2023, población de 12 a 30 años",
    provision: "Destina el 10 % a educación formal y no formal, con prioridad para mujeres en condición de vulnerabilidad.",
    commitment: "Acercaremos formación útil y accesible a quienes han encontrado más barreras para continuar aprendiendo.",
  },
  {
    name: "Ambiente", percentage: "10 %", color: "#c78bb8", background: "/images/cabildo-mujer/series/17-eje-ambiente.png",
    summary: "Proteger la tierra también es proteger los medios de vida de las mujeres.", problemStat: "12 %",
    problem: "de las mujeres rurales hondureñas son propietarias de tierra.", source: "FAO Honduras, con datos del INE · 2026",
    provision: "Destina el 10 % a prácticas agrícolas y medios de vida que respondan a los efectos del cambio climático.",
    commitment: "Apoyaremos prácticas sostenibles que protejan el territorio y los medios de vida de las mujeres.",
  },
] as const;

export function DetallePorcentajesSlide({ activeAxis }: { activeAxis: number }) {
  const axis = axes[activeAxis];
  return <section className="information-slide axis-detail-slide" aria-labelledby="axis-detail-title">
    <div className="information-visual" aria-hidden="true">
      <Image key={axis.background} className="information-image axis-detail-image" src={axis.background} alt="" fill loading="eager" sizes="100vw" />
      <span className="information-image-shade axis-detail-shade" />
    </div>
    <div key={axis.name} className="axis-detail-content">
      <p className="information-kicker">ASÍ SE INVIERTE EL 5 % · ARTÍCULO 172</p>
      <div className="axis-detail-heading">
        <span className="axis-detail-percentage" style={{ color: axis.color }}><CountUpText value={axis.percentage} /></span>
        <div><p className="axis-detail-count">EJE {activeAxis + 1} DE {axes.length}</p><h1 id="axis-detail-title">{axis.name}</h1></div>
      </div>
      <p className="axis-detail-summary">{axis.summary}</p>
      <div className="axis-story-cards">
        <article className="axis-story-card axis-story-problem"><p className="axis-story-label"><span>01</span> El problema existe</p><strong className="axis-story-stat" style={{ color: axis.color }}><CountUpText value={axis.problemStat} /></strong><p className="axis-story-copy">{axis.problem}</p><p className="axis-story-source">Fuente: {axis.source}</p></article>
        <article className="axis-story-card axis-story-response"><p className="axis-story-label"><span>02</span> La disposición responde</p><p className="axis-story-copy">{axis.provision}</p></article>
        <article className="axis-story-card axis-story-commitment"><p className="axis-story-label"><span>03</span> Talanga cumplirá</p><p className="axis-story-copy">{axis.commitment}</p></article>
      </div>
    </div>
    <div className="sr-only">{axes.map((item) => <p key={item.name}>{item.percentage} para {item.name}. Problema: {item.problemStat} {item.problem} La disposición: {item.provision} Compromiso municipal: {item.commitment}</p>)}</div>
  </section>;
}
