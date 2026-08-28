import { carouselPhotoManifest } from "./carousel-photo-manifest";

export type AxisReport = {
  name: string;
  shortName: string;
  percentage: string;
  color: string;
  background: string;
  headline: string;
  summary: string;
  activitySummary: string;
  budget: number;
  executed: number;
  committed: number;
  beneficiaries: string;
  activities: Array<{
    title: string;
    description: string;
    reach: string;
  }>;
  photos: Array<{ src: string; alt: string; caption: string }>;
};

type CarouselFolder = keyof typeof carouselPhotoManifest;

const carouselPhotos = (folder: CarouselFolder, axis: string) =>
  carouselPhotoManifest[folder].map((src, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      src,
      alt: `Registro fotográfico del eje ${axis}, imagen ${index + 1}`,
      caption: `Registro fotográfico ${number}`,
    };
  });

/**
 * Datos editables de las slides financieras por eje.
 *
 * Las fotografías originales se conservan con sus nombres de origen. El carrusel
 * utiliza copias ordenadas dentro de /public/images/cabildo-mujer/ejes/<eje>/carousel.
 * Para cambiar el orden, basta con intercambiar los nombres numéricos.
 *
 * La información de actividades y beneficiarias procede de informacion-ejes.txt
 * y complementa el reporte financiero existente.
 */
export const officeWomanReport = {
  fiscalYear: 2026,
  axes: [
    {
      name: "Economía", shortName: "Economía", percentage: "30 %", color: "#f07167",
      background: "/images/cabildo-mujer/series/12-eje-economia.png",
      headline: "Autonomía que se construye con oportunidades reales.",
      summary: "Impulso productivo, formación y servicios de cuidado que permiten a más mujeres sostener sus propios proyectos.",
      activitySummary: "Talleres de productos, donaciones para emprendimientos, capacitación de negocios, apoyo para producir tortillas y alimentación a familias de escasos recursos.",
      budget: 333883.71, executed: 100747.09, committed: 48021.26,
      beneficiaries: "+302",
      activities: [
        { title: "Talleres para elaborar productos", description: "Talleres de encurtidos, piñatas y flores para convertir habilidades en fuentes de ingreso familiar.", reach: "+150 mujeres" },
        { title: "Insumos para emprendimientos", description: "Recursos en especie para iniciar o fortalecer emprendimientos.", reach: "+50 mujeres" },
        { title: "Alimentación para familias", description: "Apoyo alimentario para hogares de escasos recursos.", reach: "+50 familias" },
        { title: "Gestión y administración de negocios", description: "Capacitación para administrar recursos y sostener los negocios en el tiempo.", reach: "30 mujeres" },
        { title: "Emprendimientos de tortillas", description: "Insumos para convertir la elaboración de tortillas en una oportunidad de ingreso.", reach: "22 mujeres" },
      ],
      photos: carouselPhotos("economia", "Economía"),
    },
    {
      name: "Prevención de violencia", shortName: "Prevención", percentage: "20 %", color: "#d986bd",
      background: "/images/cabildo-mujer/series/13-eje-prevencion-violencia.png",
      headline: "Una red cercana cuando pedir ayuda no puede esperar.",
      summary: "Prevención, orientación y acompañamiento articulado para que ninguna mujer enfrente sola una situación de violencia.",
      activitySummary: "Charlas sobre violencia de género y violencia intrafamiliar, clasificadas por la temática reportada.",
      budget: 222589.14, executed: 67164.72, committed: 32014.18,
      beneficiaries: "90",
      activities: [
        { title: "Charla sobre violencia de género", description: "Herramientas para reconocer las formas de violencia, prevenirlas y buscar apoyo.", reach: "40 participantes" },
        { title: "Charla sobre violencia intrafamiliar", description: "Orientación para identificar riesgos y promover relaciones basadas en respeto y seguridad.", reach: "50 participantes" },
      ],
      photos: carouselPhotos("prevencion-violencia", "Prevención de violencia"),
    },
    {
      name: "Salud", shortName: "Salud", percentage: "20 %", color: "#a86aa4",
      background: "/images/cabildo-mujer/series/14-eje-salud.png",
      headline: "Cuidado integral en cada etapa de la vida.",
      summary: "Acciones de prevención, información y atención que acercan el derecho a la salud a mujeres de todo el municipio.",
      activitySummary: "Citologías y esterilizaciones con transporte, alimentación y acompañamiento, además de la entrega de sillas de ruedas.",
      budget: 222589.14, executed: 67164.72, committed: 32014.18,
      beneficiaries: "118",
      activities: [
        { title: "Realización de citologías", description: "Transporte, alimentación y acceso al examen para acercar la prevención.", reach: "105 mujeres" },
        { title: "Entrega de sillas de ruedas", description: "Apoyo directo para recuperar movilidad y autonomía.", reach: "2 mujeres" },
        { title: "Jornadas de esterilización", description: "Acompañamiento, transporte, alimentación y cobertura del procedimiento.", reach: "11 mujeres" },
      ],
      photos: carouselPhotos("salud", "Salud"),
    },
    {
      name: "Participación", shortName: "Participación", percentage: "10 %", color: "#f2aaa0",
      background: "/images/cabildo-mujer/series/15-eje-participacion.png",
      headline: "Más voces de mujeres tomando decisiones.",
      summary: "Organización, liderazgo y espacios municipales donde las propuestas de las mujeres se convierten en agenda pública.",
      activitySummary: "Celebración del Día de las Madres y charlas sobre autoestima, amor propio, empoderamiento, participación y logros.",
      budget: 111294.57, executed: 33582.36, committed: 16007.09,
      beneficiaries: "+700",
      activities: [
        { title: "Celebración del Día de las Madres", description: "Apoyo municipal en gestión, documentación y logística del encuentro.", reach: "+500 personas premiadas" },
        { title: "Autoestima y amor propio", description: "Un espacio para reconocer el valor personal y fortalecer la confianza.", reach: "40 participantes" },
        { title: "Empoderamiento", description: "Herramientas para ejercer derechos y avanzar con mayor autonomía.", reach: "80 participantes" },
        { title: "Participación", description: "Impulso a la presencia de las mujeres en las decisiones comunitarias.", reach: "40 participantes" },
        { title: "Logros", description: "Un encuentro para reconocer avances y convertirlos en impulso colectivo.", reach: "40 participantes" },
      ],
      photos: carouselPhotos("participacion", "Participación"),
    },
    {
      name: "Educación", shortName: "Educación", percentage: "10 %", color: "#81527d",
      background: "/images/cabildo-mujer/series/16-eje-educacion.png",
      headline: "Aprendizajes que abren nuevas posibilidades.",
      summary: "Formación accesible y útil para mujeres que buscan continuar aprendiendo y ampliar sus oportunidades.",
      activitySummary: "Gestión y logística para entregar más de 5,000 kits escolares, junto con 38 becas mediante selección y documentación previa.",
      budget: 111294.57, executed: 33582.36, committed: 16007.09,
      beneficiaries: "+5,038",
      activities: [
        { title: "Entrega de kits escolares", description: "Gestión y logística para llevar útiles a estudiantes de todo el municipio.", reach: "+5,000 estudiantes" },
        { title: "Becas escolares", description: "Bonos para estudiantes de alto rendimiento, priorizando hogares administrados por mujeres.", reach: "38 estudiantes" },
      ],
      photos: carouselPhotos("educacion", "Educación"),
    },
    {
      name: "Ambiente", shortName: "Ambiente", percentage: "10 %", color: "#c78bb8",
      background: "/images/cabildo-mujer/series/17-eje-ambiente.png",
      headline: "Cuidar el territorio sostiene la vida.",
      summary: "Prácticas sostenibles y medios de vida resilientes que reconocen el papel de las mujeres en la protección del entorno.",
      activitySummary: "Contratación de mujeres para labores relacionadas con el mantenimiento de las áreas verdes de la municipalidad.",
      budget: 111294.56, executed: 33582.37, committed: 16007.08,
      beneficiaries: "5",
      activities: [
        { title: "Mantenimiento de áreas verdes", description: "Empleo para mujeres que une oportunidad laboral y cuidado del entorno.", reach: "5 mujeres" },
      ],
      photos: carouselPhotos("ambiente", "Ambiente"),
    },
  ] satisfies AxisReport[],
} as const;

export const formatLempiras = (value: number) =>
  new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "HNL",
    minimumFractionDigits: 2,
  }).format(value).replace("HNL", "L");
