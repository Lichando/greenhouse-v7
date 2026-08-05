'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { PropertyDTO } from '../types';
import { formatPrice } from '../../../helpers/format';

interface PropertyDetailProps {
  property: PropertyDTO;
}

const labels = {
  type: {
    APARTMENT: 'Departamento',
    HOUSE: 'Casa',
    LAND: 'Terreno',
    COMMERCIAL: 'Comercial',
  },
  operation: { SALE: 'En venta', RENT: 'En alquiler' },
  status: { ACTIVE: 'Disponible', INACTIVE: 'No disponible' },
};

function DetailIcon({ type }: { type: 'bed' | 'bath' | 'area' | 'pin' }) {
  const paths = {
    bed: 'M3 18v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M3 16h18M5 11V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3',
    bath: 'M5 11h14a2 2 0 0 1 2 2v1H3v-1a2 2 0 0 1 2-2ZM6 11V6a3 3 0 0 1 5.8-.8M3 14v2a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-2',
    area: 'M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5',
    pin: 'M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  };

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d={paths[type]} />
    </svg>
  );
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const images = property.images.length ? property.images : [];
  const [selectedImage, setSelectedImage] = useState(images.find((image) => image.isPrimary) || images[0]);
  const typeLabel = labels.type[property.type as keyof typeof labels.type] || property.type;
  const operationLabel = labels.operation[property.operation as keyof typeof labels.operation] || property.operation;
  const statusLabel = labels.status[property.status as keyof typeof labels.status] || property.status;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-2 text-sm font-montserrat text-neutral-500 dark:text-neutral-400">
        <Link className="transition-colors hover:text-primary" href="/properties">Propiedades</Link>
        <span>/</span>
        <span className="truncate text-neutral-700 dark:text-neutral-300">{property.title}</span>
      </div>

      <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800 lg:min-h-[520px]">
          {selectedImage ? (
            <Image src={selectedImage.imageUrl} alt={property.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 75vw" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-neutral-500">Imagen no disponible</div>
          )}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 to-transparent p-6 pt-20">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary">{statusLabel}</span>
            <span className="text-sm font-montserrat text-white">{images.length} {images.length === 1 ? 'imagen' : 'imágenes'}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:grid-rows-3">
          {images.slice(0, 3).map((image) => (
            <button key={image.id} type="button" onClick={() => setSelectedImage(image)} className={`relative min-h-24 overflow-hidden rounded-2xl border-2 transition-all lg:min-h-0 ${selectedImage?.id === image.id ? 'border-primary' : 'border-transparent opacity-75 hover:opacity-100'}`} aria-label={`Ver imagen ${image.order + 1}`}>
              <Image src={image.imageUrl} alt="" fill className="object-cover" sizes="220px" />
            </button>
          ))}
        </div>
      </section>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_350px]">
        <main className="space-y-10">
          <header>
            <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <span>{operationLabel}</span><span className="text-neutral-400">·</span><span>{typeLabel}</span>
            </div>
            <h1 className="font-bebas text-5xl leading-none tracking-tight text-neutral-900 dark:text-white sm:text-6xl">{property.title}</h1>
            <p className="mt-4 flex items-center gap-2 font-montserrat text-neutral-600 dark:text-neutral-400"><DetailIcon type="pin" />{property.address}, {property.city}, {property.province}</p>
          </header>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {property.bedrooms !== null && <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"><DetailIcon type="bed" /><p className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-white">{property.bedrooms}</p><p className="text-xs font-montserrat text-neutral-500">Dormitorios</p></div>}
            {property.bathrooms !== null && <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"><DetailIcon type="bath" /><p className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-white">{property.bathrooms}</p><p className="text-xs font-montserrat text-neutral-500">Baños</p></div>}
            {property.area !== null && <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"><DetailIcon type="area" /><p className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-white">{property.area} m²</p><p className="text-xs font-montserrat text-neutral-500">Superficie</p></div>}
            <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"><DetailIcon type="pin" /><p className="mt-4 text-2xl font-semibold text-neutral-900 dark:text-white">{property.city}</p><p className="text-xs font-montserrat text-neutral-500">Ubicación</p></div>
          </div>

          <section className="border-t border-neutral-200 pt-8 dark:border-neutral-800"><h2 className="font-bebas text-3xl tracking-tight text-neutral-900 dark:text-white">Sobre esta propiedad</h2><p className="mt-4 whitespace-pre-line font-montserrat leading-7 text-neutral-600 dark:text-neutral-300">{property.description}</p></section>

          <section className="border-t border-neutral-200 pt-8 dark:border-neutral-800"><h2 className="font-bebas text-3xl tracking-tight text-neutral-900 dark:text-white">Detalles</h2><dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="font-montserrat text-neutral-500">Tipo de propiedad</dt><dd className="mt-1 font-semibold text-neutral-900 dark:text-white">{typeLabel}</dd></div><div><dt className="font-montserrat text-neutral-500">Operación</dt><dd className="mt-1 font-semibold text-neutral-900 dark:text-white">{operationLabel}</dd></div><div><dt className="font-montserrat text-neutral-500">Publicada</dt><dd className="mt-1 font-semibold text-neutral-900 dark:text-white">{new Date(property.createdAt).toLocaleDateString('es-AR')}</dd></div><div><dt className="font-montserrat text-neutral-500">Código de propiedad</dt><dd className="mt-1 font-semibold text-neutral-900 dark:text-white">GH-{property.id}</dd></div></dl></section>
        </main>

        <aside className="lg:pt-2"><div className="sticky top-6 rounded-3xl border border-primary/20 bg-white p-6 shadow-xl shadow-primary/5 dark:border-primary/30 dark:bg-neutral-900"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Valor de la propiedad</p><p className="mt-2 font-bebas text-5xl tracking-tight text-primary">{formatPrice(property.price)}</p><p className="mt-2 font-montserrat text-sm text-neutral-500">Respuesta de un asesor en menos de 24 horas.</p><div className="mt-6 space-y-3"><button className="w-full rounded-xl bg-primary px-4 py-3 font-montserrat font-semibold text-primary-foreground transition-all hover:brightness-110">Quiero consultar</button><button className="w-full rounded-xl border border-primary/30 px-4 py-3 font-montserrat font-semibold text-primary transition-colors hover:bg-primary/10">Agendar una visita</button></div><div className="mt-6 border-t border-neutral-200 pt-5 text-sm dark:border-neutral-800"><p className="font-semibold text-neutral-900 dark:text-white">¿Necesitas más información?</p><a href="/contact" className="mt-2 inline-block font-montserrat text-primary hover:underline">Hablar con GREEN HOUSE →</a></div></div></aside>
      </div>
    </div>
  );
}
