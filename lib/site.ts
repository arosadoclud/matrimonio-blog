import type { Category } from "@/types/post";
import { slugify } from "./utils";

export const siteConfig = {
  name: "Restaura Tu Matrimonio",
  domain: "restauratumatrimonio-blog.com",
  url: "https://restauratumatrimonio-blog.com",
  description:
    "Recursos cristianos, oración y enseñanzas para matrimonios que desean sanar, perdonar y volver a construir.",
  // Landing de ventas (checkout Hotmart) — dominio separado a propósito, no cambia.
  hotmartUrl: "https://restauratumatrimonio.org/",
  whatsappUrl:
    "https://wa.me/18492763532?text=Hola%2C%20llegu%C3%A9%20desde%20la%20gu%C3%ADa%20de%20Restaura%20tu%20Matrimonio%20y%20quisiera%20recibir%20orientaci%C3%B3n.",
};

export const categories: Category[] = [
  {
    name: "Restauración matrimonial",
    slug: "restauracion-matrimonial",
    description: "Guías cristianas para volver a construir confianza, amor y propósito.",
  },
  {
    name: "Oración por el matrimonio",
    slug: "oracion-por-el-matrimonio",
    description: "Oraciones y devocionales para presentar tu relación delante de Dios.",
  },
  {
    name: "Perdón y reconciliación",
    slug: "perdon-y-reconciliacion",
    description: "Contenido para sanar heridas, pedir perdón y abrir caminos de paz.",
  },
  {
    name: "Crisis matrimonial",
    slug: "crisis-matrimonial",
    description: "Primeros pasos cuando el matrimonio atraviesa distancia o dolor.",
  },
  {
    name: "Comunicación en pareja",
    slug: "comunicacion-en-pareja",
    description: "Herramientas bíblicas y prácticas para escuchar, hablar y reconectar.",
    intro:
      "Muchas crisis matrimoniales no empiezan con un evento grande, sino con conversaciones que dejaron de suceder. Aquí encontrarás herramientas prácticas y principios bíblicos para escuchar sin defenderte, hablar sin herir, y reconectar con tu cónyuge incluso cuando llevan tiempo sin lograr hablar de lo importante.",
  },
  {
    name: "Consejos bíblicos",
    slug: "consejos-biblicos",
    description: "Principios de la Palabra aplicados a la vida matrimonial diaria.",
  },
  {
    name: "Testimonios",
    slug: "testimonios",
    description: "Historias de esperanza para recordar que Dios sigue obrando.",
    intro:
      "Compartimos únicamente testimonios reales de personas que autorizaron contar su historia, sin promesas de que tu proceso terminará igual. Ningún matrimonio se restaura exactamente como otro, y ninguna historia aquí garantiza un resultado — lo que sí puedes tomar es honestidad sobre lo que tomó tiempo, la ayuda que buscaron y la fe que sostuvo el proceso.",
  },
  {
    name: "Preguntas frecuentes",
    slug: "preguntas-frecuentes",
    description: "Respuestas claras para dudas comunes en procesos de restauración.",
  },
];

// Mapea el nombre de categoría (lib/site.ts) al clúster temático de
// docs/seo-content-plan-90-days.md / docs/keyword-map.md. Se usa solo para
// enriquecer analítica (content_cluster en CtaClick), no afecta rutas ni SEO.
export const categoryClusters: Record<string, string> = {
  "Restauración matrimonial": "restauracion_matrimonial",
  "Crisis matrimonial": "separacion_y_distancia_emocional",
  "Perdón y reconciliación": "infidelidad_perdon_confianza",
  "Oración por el matrimonio": "oracion_y_principios_biblicos",
  "Comunicación en pareja": "comunicacion_matrimonial",
  "Consejos bíblicos": "oracion_y_principios_biblicos",
  Testimonios: "recursos_y_acompanamiento",
  "Preguntas frecuentes": "recursos_y_acompanamiento",
};

// Re-export slugify for backward compatibility
export { slugify };
