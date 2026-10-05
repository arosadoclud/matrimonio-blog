import type { Metadata } from "next";
import Link from "next/link";
import { buildCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Qué cookies y tecnologías similares usa Restaura Tu Matrimonio, para qué sirven, quién las coloca y cómo puedes gestionarlas.",
  alternates: {
    canonical: buildCanonicalUrl("/cookies"),
  },
};

export default function CookiesPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Legal</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Política de Cookies
      </h1>
      <p className="mt-3 text-sm text-[#1F1F1F]/60">Última actualización: 5 de octubre de 2026</p>
      <div className="prose-article mt-8">
        <p>
          Las cookies son pequeños archivos que un sitio web guarda en tu navegador. Otras
          tecnologías similares, como el almacenamiento local o los píxeles de seguimiento, cumplen
          funciones parecidas. Esta página explica cuáles puede usar este sitio y cómo puedes
          controlarlas. Para saber cómo tratamos tus datos en general, consulta la{" "}
          <Link href="/privacidad">Política de Privacidad</Link>.
        </p>

        <h2>Tipos de cookies que podemos usar</h2>

        <h3>Necesarias y de preferencias</h3>
        <p>
          Permiten que el sitio funcione y recuerde tus elecciones. Por ejemplo, si el aviso de
          cookies está activo, guardamos en tu navegador (almacenamiento local) si aceptaste o
          rechazaste las herramientas de medición, para no preguntártelo en cada visita.
        </p>

        <h3>De analítica y medición</h3>
        <p>
          Nos ayudan a entender qué artículos son más útiles, cómo navegan las personas y qué temas
          necesitan más profundidad. Podemos usar <strong>Google Analytics</strong>,{" "}
          <strong>Microsoft Clarity</strong> y <strong>Meta Pixel</strong>, que colocan sus propias
          cookies y recogen datos como las páginas visitadas, el dispositivo y el tiempo de
          permanencia.
        </p>

        <h3>De publicidad</h3>
        <p>
          Si el sitio muestra anuncios mediante <strong>Google AdSense</strong>, Google y sus
          socios pueden usar cookies para mostrar anuncios y medir su rendimiento. Estas cookies
          permiten a Google y a sus socios publicar anuncios en función de tus visitas a este sitio
          y/o a otros sitios de Internet.
        </p>

        <h2>Quién coloca las cookies</h2>
        <p>
          Algunas cookies son propias, es decir, las coloca este sitio. Otras son de terceros, es
          decir, las colocan los proveedores mencionados arriba cuando cargan sus herramientas en
          nuestras páginas. Cada proveedor tiene su propia política y es responsable de sus cookies.
        </p>

        <h2>Cómo gestionar o desactivar las cookies</h2>
        <ul>
          <li>
            <strong>Aviso de cookies de este sitio.</strong> Cuando está activo, puedes aceptar o
            rechazar las herramientas de medición y cambiar tu elección en cualquier momento desde
            el enlace &quot;Preferencias de cookies&quot;.
          </li>
          <li>
            <strong>Tu navegador.</strong> Puedes borrar o bloquear cookies desde la configuración
            de tu navegador. Algunas funciones del sitio podrían dejar de funcionar correctamente si
            bloqueas todas las cookies.
          </li>
          <li>
            <strong>Publicidad personalizada de Google.</strong> Puedes inhabilitarla desde la{" "}
            <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
              Configuración de anuncios de Google
            </a>
            . También puedes gestionar las cookies de otros anunciantes en{" "}
            <a href="https://www.aboutads.info" rel="noopener noreferrer" target="_blank">
              aboutads.info
            </a>
            .
          </li>
        </ul>

        <h2>Más información</h2>
        <p>
          Puedes conocer más sobre cómo Google usa los datos de los sitios que emplean sus servicios
          en{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            rel="noopener noreferrer"
            target="_blank"
          >
            policies.google.com/technologies/partner-sites
          </a>
          . Si tienes preguntas sobre esta política, escríbenos desde la página de{" "}
          <Link href="/contacto">contacto</Link>.
        </p>
      </div>
    </section>
  );
}
