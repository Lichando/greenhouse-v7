'use client';

import { PropertyCard } from './PropertyCard';
import { PropertyCardProps } from '../types';

interface PropertyGridProps {
  properties: PropertyCardProps[];
  loading?: boolean;
}

export function PropertyGrid({ properties, loading }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="text-center">
          <p className="font-bebas text-2xl font-bold text-neutral-900 dark:text-white">
            No hay propiedades disponibles
          </p>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 font-montserrat">
            Intenta ajustando los filtros de búsqueda
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} {...property} />
      ))}
    </div>
  );
}
