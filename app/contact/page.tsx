'use client';

import { MainLayout } from '@/src/components/layout/MainLayout';
import { useState } from 'react';

const contactCards = [
  { title: 'Visítanos', detail: 'Avenida Pellegrini 1234\nRosario, Santa Fe', action: 'Cómo llegar', href: '#' },
  { title: 'Llámanos', detail: '+54 11 1234-5678\nLun. a vie. de 9 a 18 h', action: 'Llamar ahora', href: 'tel:+541112345678' },
  { title: 'Escríbenos', detail: 'info@greenhouse.com\nRespondemos en menos de 24 h', action: 'Enviar email', href: 'mailto:info@greenhouse.com' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    window.setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <MainLayout>
      <div className="bg-neutral-50/60 dark:bg-neutral-950/30">
        <section className="bg-gradient-to-r from-primary to-secondary px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl fade-in-up">
            <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.22em] text-white/75">Estamos para ayudarte</p>
            <h1 className="mt-4 max-w-3xl font-bebas text-6xl leading-none tracking-tight text-white sm:text-7xl">HABLEMOS DE TU PRÓXIMO PASO</h1>
            <p className="mt-5 max-w-2xl font-montserrat text-lg leading-7 text-white/85">Ya sea que estés buscando una propiedad, quieras publicar o necesites asesoramiento, el equipo de GREEN HOUSE está listo para acompañarte.</p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {contactCards.map((card, index) => (
              <div key={card.title} className={`fade-in-up-${index + 1} rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900`}>
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><span className="font-bebas text-xl">0{index + 1}</span></div>
                <h2 className="font-bebas text-2xl text-neutral-900 dark:text-white">{card.title}</h2>
                <p className="mt-3 whitespace-pre-line font-montserrat text-sm leading-6 text-neutral-600 dark:text-neutral-400">{card.detail}</p>
                <a href={card.href} className="mt-5 inline-block font-montserrat text-sm font-semibold text-primary hover:underline">{card.action} →</a>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <aside className="fade-in-up-2 rounded-3xl bg-primary p-8 text-primary-foreground lg:sticky lg:top-6">
              <p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">Atención personalizada</p>
              <h2 className="mt-4 font-bebas text-4xl leading-none">¿CÓMO PODEMOS AYUDARTE?</h2>
              <div className="mt-8 space-y-5 font-montserrat text-sm text-primary-foreground/85">
                <div><p className="font-semibold text-primary-foreground">Estoy buscando una propiedad</p><p className="mt-1">Te ayudamos a encontrar opciones que se ajusten a tu búsqueda.</p></div>
                <div><p className="font-semibold text-primary-foreground">Quiero publicar una propiedad</p><p className="mt-1">Conocé nuestros planes para vendedores y profesionales.</p></div>
                <div><p className="font-semibold text-primary-foreground">Necesito soporte</p><p className="mt-1">Nuestro equipo puede orientarte con tu cuenta o consulta.</p></div>
              </div>
            </aside>

            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
              <div className="mb-8"><p className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-primary">Formulario de contacto</p><h2 className="mt-3 font-bebas text-4xl text-neutral-900 dark:text-white">CONTANOS QUÉ NECESITÁS</h2><p className="mt-2 font-montserrat text-sm text-neutral-600 dark:text-neutral-400">Completá tus datos y un asesor se pondrá en contacto con vos.</p></div>
              {submitted && <div role="status" className="mb-6 rounded-2xl border border-primary/30 bg-primary/10 p-4 font-montserrat text-sm text-primary">Gracias por escribirnos. Recibimos tu mensaje y te responderemos pronto.</div>}
              <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="name" className="font-montserrat text-sm font-semibold text-neutral-700 dark:text-neutral-300">Nombre completo</label><input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Tu nombre" className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 font-montserrat text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:text-white" /></div>
                <div><label htmlFor="email" className="font-montserrat text-sm font-semibold text-neutral-700 dark:text-neutral-300">Email</label><input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="tu@email.com" className="mt-2 w-full rounded-xl border border-neutral-300 bg-transparent px-4 py-3 font-montserrat text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:text-white" /></div>
                <div className="sm:col-span-2"><label htmlFor="subject" className="font-montserrat text-sm font-semibold text-neutral-700 dark:text-neutral-300">Motivo de consulta</label><select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 font-montserrat text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"><option value="">Seleccioná una opción</option><option value="buyer">Busco comprar o alquilar</option><option value="seller">Quiero publicar una propiedad</option><option value="professional">Soy profesional inmobiliario</option><option value="support">Soporte</option></select></div>
                <div className="sm:col-span-2"><label htmlFor="message" className="font-montserrat text-sm font-semibold text-neutral-700 dark:text-neutral-300">Mensaje</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Contanos cómo podemos ayudarte" className="mt-2 w-full resize-none rounded-xl border border-neutral-300 bg-transparent px-4 py-3 font-montserrat text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-neutral-700 dark:text-white" /></div>
                <div className="sm:col-span-2"><button type="submit" className="w-full rounded-xl bg-primary px-5 py-3.5 font-montserrat font-semibold text-primary-foreground transition-all hover:brightness-110">Enviar consulta</button></div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
