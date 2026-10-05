import type { Metadata } from "next";
import Link from "next/link";
import { buildCanonicalUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad de Restaura Tu Matrimonio: qué datos recibimos, con qué proveedores los procesamos, cómo funciona la publicidad de Google y cómo ejercer tus derechos.",
  alternates: {
    canonical: buildCanonicalUrl("/privacidad"),
  },
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Legal</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Política de Privacidad
      </h1>
      <p className="mt-3 text-sm text-[#1F1F1F]/60">Última actualización: 5 de octubre de 2026</p>
      <div className="prose-article mt-8">
        <p>
          {siteConfig.name} es un sitio editorial independiente de contenido cristiano sobre
          matrimonio. Esta política explica qué información podemos recibir cuando lo visitas o nos
          escribes, para qué la usamos, con qué proveedores trabajamos y qué opciones tienes.
        </p>

        <h2>Información que recibimos</h2>
        <p>
          <strong>Datos que nos envías voluntariamente.</strong> Si usas el formulario de contacto
          recibimos tu nombre, tu correo electrónico, el motivo y el mensaje que escribas. Si
          solicitas la guía gratuita o te suscribes, recibimos tu correo electrónico y, si lo
          indicas, tu nombre.
        </p>
        <p>
          <strong>Datos de navegación.</strong> Como en cualquier sitio web, nuestros servidores y
          las herramientas de medición descritas más abajo pueden registrar datos técnicos como la
          dirección IP, el tipo de navegador, el dispositivo, las páginas visitadas y la fecha y
          hora de la visita.
        </p>
        <p>
          Te pedimos que no incluyas en los formularios información sensible que no sea necesaria
          (datos de salud, de terceros o detalles que permitan identificar a tu familia). Si
          escribes sobre una situación personal, usaremos lo que compartas únicamente para
          responderte.
        </p>

        <h2>Para qué usamos la información</h2>
        <ul>
          <li>Responder a tus mensajes de contacto.</li>
          <li>Enviarte la guía gratuita que solicitaste y, si corresponde, correos relacionados.</li>
          <li>Entender qué contenidos son más útiles y mejorar el sitio.</li>
          <li>Mostrar publicidad en el sitio cuando esté activa y medir su rendimiento.</li>
          <li>Prevenir abusos, como envíos automáticos masivos en los formularios.</li>
        </ul>
        <p>No vendemos tus datos personales.</p>

        <h2>Proveedores que procesan información</h2>
        <p>
          Para operar el sitio usamos servicios de terceros que pueden procesar datos en nuestro
          nombre o por su cuenta, según el caso:
        </p>
        <ul>
          <li>
            <strong>Brevo</strong>: envío de correos (respuestas del formulario de contacto y envío
            de la guía) y almacenamiento de la lista de contactos de la guía y el boletín.
          </li>
          <li>
            <strong>Vercel</strong>: alojamiento y entrega del sitio web.
          </li>
          <li>
            <strong>Google Analytics</strong>, <strong>Microsoft Clarity</strong> y{" "}
            <strong>Meta Pixel</strong>: herramientas de medición y analítica que pueden estar
            activas para entender el uso del sitio y la efectividad de nuestras páginas.
          </li>
          <li>
            <strong>Google AdSense</strong>: publicidad, descrita en la sección siguiente.
          </li>
        </ul>
        <p>
          Algunos de estos proveedores pueden procesar datos en servidores ubicados fuera de tu
          país. Cada uno aplica sus propias políticas de privacidad.
        </p>

        <h2>Publicidad y Google AdSense</h2>
        <p>
          Este sitio usa o puede usar Google AdSense para mostrar anuncios. Esto implica lo
          siguiente:
        </p>
        <ul>
          <li>
            Google, como proveedor externo, utiliza cookies para publicar anuncios en este sitio.
          </li>
          <li>
            El uso de cookies de publicidad por parte de Google permite que Google y sus socios
            muestren anuncios a los usuarios en función de sus visitas a este sitio y/o a otros
            sitios de Internet.
          </li>
          <li>
            Puedes inhabilitar la publicidad personalizada desde la{" "}
            <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">
              Configuración de anuncios de Google
            </a>
            . También puedes consultar{" "}
            <a href="https://www.aboutads.info" rel="noopener noreferrer" target="_blank">
              aboutads.info
            </a>{" "}
            para gestionar el uso de cookies de otros anunciantes.
          </li>
          <li>
            Puedes conocer más sobre cómo Google usa los datos de sitios que utilizan sus
            servicios en{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              rel="noopener noreferrer"
              target="_blank"
            >
              policies.google.com/technologies/partner-sites
            </a>
            .
          </li>
        </ul>
        <p>
          Para más información sobre las cookies que usamos y cómo gestionarlas, consulta nuestra{" "}
          <Link href="/cookies">Política de Cookies</Link>.
        </p>

        <h2>Enlaces de afiliado</h2>
        <p>
          Algunas páginas contienen enlaces de afiliado. Si compras desde esos enlaces, podríamos
          recibir una comisión sin costo adicional para ti. Puedes leer más en la página de{" "}
          <Link href="/afiliados">afiliados</Link>.
        </p>

        <h2>Conservación de los datos</h2>
        <p>
          Conservamos los datos que nos envías durante el tiempo necesario para las finalidades
          descritas o hasta que solicites su eliminación. Los datos de medición se conservan según
          los plazos de cada herramienta.
        </p>

        <h2>Tus derechos</h2>
        <p>
          Puedes pedirnos acceso a tus datos, su corrección o eliminación, oponerte a su uso o
          solicitar la baja de cualquier envío de correos. Para hacerlo, escríbenos desde la página
          de <Link href="/contacto">contacto</Link> indicando el correo con el que te comunicaste.
          Según el lugar donde vivas, también puedes tener derechos adicionales reconocidos por la
          ley de tu país.
        </p>

        <h2>Menores de edad</h2>
        <p>
          Este sitio está dirigido a personas adultas. No recopilamos de forma intencionada datos de
          menores de edad.
        </p>

        <h2>Seguridad</h2>
        <p>
          El sitio se sirve mediante conexión cifrada (HTTPS) y limita la cantidad de envíos por
          formulario para prevenir abusos. Ningún sistema es completamente seguro, por lo que no
          podemos garantizar una protección absoluta.
        </p>

        <h2>Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política cuando cambien nuestros servicios o la normativa. La
          fecha de la última actualización aparece al inicio de esta página.
        </p>

        <h2>Contacto</h2>
        <p>
          Para consultas sobre privacidad, escríbenos desde la página de{" "}
          <Link href="/contacto">contacto</Link>.
        </p>
      </div>
    </section>
  );
}
