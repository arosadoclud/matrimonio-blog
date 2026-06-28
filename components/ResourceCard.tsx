import Image from "next/image";
import Link from "next/link";

export function ResourceCard() {
  return (
    <section className="grid gap-8 rounded-[8px] border border-[#D4AF37]/35 bg-white p-6 shadow-lg sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[280px] overflow-hidden rounded-[8px]">
        <Image
          src="https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=1200&q=80"
          alt="Pareja tomándose de las manos durante un momento de reflexión"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Recurso recomendado</p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl font-bold leading-tight text-[#5A0F18]">
          Programa cristiano para restaurar tu matrimonio
        </h1>
        <p className="mt-4 leading-7 text-[#1F1F1F]/72">
          Un recurso pensado para matrimonios que desean avanzar con oración, reflexión bíblica y
          acciones prácticas para sanar conversaciones, heridas y distancia emocional.
        </p>
        <ul className="mt-5 grid gap-3 text-sm leading-6 text-[#1F1F1F]/75">
          <li>Beneficios: claridad espiritual, ejercicios de reconciliación y enfoque diario.</li>
          <li>Para quién es: esposos, esposas y parejas en crisis que aún desean buscar dirección.</li>
          <li>Ideal como acompañamiento junto a consejería pastoral o profesional.</li>
        </ul>
        <Link
          href="#"
          className="mt-7 inline-flex rounded-full bg-[#5A0F18] px-7 py-3.5 font-semibold text-white"
        >
          Acceder al recurso
        </Link>
        <p className="mt-4 text-xs leading-5 text-[#1F1F1F]/50">
          Aviso: este sitio puede recibir una comisión si compras desde enlaces de afiliado, sin
          costo adicional para ti.
        </p>
      </div>
    </section>
  );
}
