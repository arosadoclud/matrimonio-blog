import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Restaura Tu Matrimonio para consultas, colaboraciones o mensajes sobre recursos cristianos de restauración matrimonial."
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#8a6a18]">Contacto</p>
      <h1 className="mt-2 font-[var(--font-display)] text-5xl font-bold text-[#5A0F18]">
        Escríbenos
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-[#1F1F1F]/70">
        Este formulario está listo para conectarse luego a un proveedor de email, CRM o función
        serverless.
      </p>
      <form className="mt-10 grid gap-5 rounded-[8px] border border-[#5A0F18]/10 bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold text-[#5A0F18]">
            Nombre
            <input className="rounded-[8px] border border-[#5A0F18]/15 px-4 py-3 outline-none focus:border-[#D4AF37]" name="name" />
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#5A0F18]">
            Email
            <input className="rounded-[8px] border border-[#5A0F18]/15 px-4 py-3 outline-none focus:border-[#D4AF37]" name="email" type="email" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-semibold text-[#5A0F18]">
          Motivo de contacto
          <select className="rounded-[8px] border border-[#5A0F18]/15 px-4 py-3 outline-none focus:border-[#D4AF37]" name="reason">
            <option>Consulta general</option>
            <option>Recurso recomendado</option>
            <option>Colaboración</option>
            <option>Testimonio</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#5A0F18]">
          Mensaje
          <textarea className="min-h-40 rounded-[8px] border border-[#5A0F18]/15 px-4 py-3 outline-none focus:border-[#D4AF37]" name="message" />
        </label>
        <button className="rounded-full bg-[#5A0F18] px-7 py-3.5 font-semibold text-white" type="button">
          Enviar mensaje
        </button>
      </form>
    </section>
  );
}
