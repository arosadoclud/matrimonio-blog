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
  },
  {
    name: "Preguntas frecuentes",
    slug: "preguntas-frecuentes",
    description: "Respuestas claras para dudas comunes en procesos de restauración.",
  },
];

// Re-export slugify for backward compatibility
export { slugify };
