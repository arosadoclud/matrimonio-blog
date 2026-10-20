import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { Hero } from "@/components/Hero";
import { getAllPosts } from "@/lib/posts";
import { categories, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guías para cuidar tu matrimonio con fe y acciones concretas",
  description: "Guías cristianas y herramientas prácticas para conversar, poner límites, pedir perdón y buscar ayuda en una crisis matrimonial.",
  alternates: { canonical: siteConfig.url },
};

const paths = [
  { number: "01", title: "Bajar la tensión", description: "Primeros pasos para detener los patrones que hacen más daño cuando todo se siente urgente.", href: "/blog/primeros-pasos-para-restaurar-un-matrimonio-en-crisis" },
  { number: "02", title: "Volver a hablar", description: "Una hoja de trabajo para preparar una conversación breve, clara y respetuosa.", href: "/herramientas/primera-conversacion" },
  { number: "03", title: "Reconstruir confianza", description: "Distinguir una disculpa de un cambio sostenido y avanzar sin exigir resultados inmediatos.", href: "/blog/como-reconstruir-la-confianza-despues-de-una-crisis-matrimonial" },
];

export default function HomePage() {
  const posts = getAllPosts();
  const featured = ["como-recuperar-la-comunicacion-con-mi-pareja", "que-dice-la-biblia-sobre-el-perdon-en-el-matrimonio", "como-restaurar-mi-matrimonio-con-la-ayuda-de-dios"]
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post): post is (typeof posts)[number] => Boolean(post));
  const topicSlugs = new Set(["crisis-matrimonial", "comunicacion-en-pareja", "perdon-y-reconciliacion", "oracion-por-el-matrimonio", "restauracion-matrimonial", "consejos-biblicos"]);

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="ruta-title">
        <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#86604f]">Una ruta posible</p><h2 id="ruta-title" className="mt-3 font-[var(--font-display)] text-5xl font-semibold leading-tight text-[#263a31]">Un paso útil para cada momento</h2><p className="mt-4 text-lg leading-8 text-[#4c594f]">Elige el punto que se parece a lo que vives hoy. Cada recurso propone algo que puedes poner en práctica sin prometer un resultado que nadie puede garantizar.</p></div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">{paths.map((path) => <Link key={path.number} href={path.href} className="group flex flex-col rounded-[1.5rem] border border-[#e4d9cb] bg-white p-7 transition hover:-translate-y-1 hover:border-[#c7a99a] hover:shadow-md"><span className="font-[var(--font-display)] text-4xl text-[#a87968]">{path.number}</span><h3 className="mt-7 font-[var(--font-display)] text-3xl font-semibold text-[#263a31]">{path.title}</h3><p className="mt-3 flex-1 leading-7 text-[#59655e]">{path.description}</p><span className="mt-8 text-sm font-bold text-[#713f50]">Explorar <span className="inline-block transition group-hover:translate-x-1" aria-hidden="true">→</span></span></Link>)}</div>
      </section>
      <section className="bg-[#e8ede7] py-20" aria-labelledby="herramienta-title"><div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8"><div className="rounded-[2rem] bg-white p-8 shadow-sm sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#3e5a49]">Herramienta gratuita</p><div className="mt-6 space-y-3 text-sm"><div className="rounded-xl bg-[#f7f8f3] p-4">1. Elige un solo tema.</div><div className="rounded-xl bg-[#f7f8f3] p-4">2. Nombra lo que sientes y necesitas.</div><div className="rounded-xl bg-[#f7f8f3] p-4">3. Propón un momento y un acuerdo posible.</div></div></div><div><h2 id="herramienta-title" className="font-[var(--font-display)] text-5xl font-semibold leading-tight text-[#263a31]">Prepara tus palabras antes de una conversación difícil.</h2><p className="mt-5 max-w-xl text-lg leading-8 text-[#4c594f]">La hoja de trabajo te permite escribir un plan privado, revisarlo y llevarlo contigo. Incluye una pauta para pausar si la conversación se vuelve hiriente.</p><Link href="/herramientas/primera-conversacion" className="mt-7 inline-flex rounded-full bg-[#293d34] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#274736]">Abrir hoja de trabajo <span className="ml-2" aria-hidden="true">↗</span></Link></div></div></section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8" aria-labelledby="temas-title"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#86604f]">Explora a tu ritmo</p><h2 id="temas-title" className="mt-3 font-[var(--font-display)] text-5xl font-semibold text-[#263a31]">Temas que acompañan tu proceso</h2></div><Link href="/categorias" className="text-sm font-bold text-[#713f50] underline underline-offset-4">Ver todas las categorías</Link></div><div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{categories.filter((category) => topicSlugs.has(category.slug)).map((category) => <Link key={category.slug} href={`/categorias/${category.slug}`} className="rounded-2xl border border-[#e4d9cb] bg-white px-6 py-5 transition hover:border-[#a87968] hover:bg-[#fbf5ef]"><h3 className="font-[var(--font-display)] text-2xl font-semibold text-[#263a31]">{category.name} <span className="text-[#a87968]" aria-hidden="true">↗</span></h3><p className="mt-2 text-sm leading-6 text-[#59655e]">{category.description}</p></Link>)}</div></section>
      <section className="border-t border-[#e4d9cb] bg-[#faf6f1] py-20" aria-labelledby="guias-title"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#86604f]">Lecturas seleccionadas</p><h2 id="guias-title" className="mt-3 font-[var(--font-display)] text-5xl font-semibold text-[#263a31]">Guías para profundizar</h2></div><Link href="/blog" className="text-sm font-bold text-[#713f50] underline underline-offset-4">Explorar el blog</Link></div><div className="mt-9 grid gap-6 md:grid-cols-3">{featured.map((post) => <BlogCard key={post.slug} post={post} />)}</div></div></section>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><div className="rounded-[2rem] bg-[#563041] px-7 py-10 text-white sm:px-12"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#edc8b9]">Nuestra manera de acompañar</p><h2 className="mt-3 max-w-3xl font-[var(--font-display)] text-4xl font-semibold leading-tight">Fe, responsabilidad y atención a la seguridad de cada persona.</h2><p className="mt-4 max-w-3xl leading-7 text-white/80">La reconciliación no se puede exigir. Nuestros contenidos invitan a escuchar, reparar y buscar apoyo adecuado. Si hay violencia, amenazas o control, la prioridad es protegerte y pedir ayuda local especializada.</p><Link href="/politica-editorial" className="mt-6 inline-flex text-sm font-bold text-white underline underline-offset-4">Conoce nuestra política editorial</Link></div></section>
    </>
  );
}
