'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PropertyCardProps } from '../types';
import { formatPrice } from '../../../helpers/format';

const typeConfig = {
  APARTMENT: { label: 'Departamento', color: 'bg-primary/10 text-primary' },
  HOUSE: { label: 'Casa', color: 'bg-accent/10 text-accent' },
  LAND: { label: 'Terreno', color: 'bg-secondary/10 text-secondary' },
  COMMERCIAL: { label: 'Comercial', color: 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400' },
};

export function PropertyCard({
  id,
  title,
  price,
  city,
  type,
  bedrooms,
  bathrooms,
  imageUrl,
  slug,
}: PropertyCardProps) {
  const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.APARTMENT;

  return (
    <Link href={`/properties/${slug}`}>
      <div className="group overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-xl transition-all hover:scale-105 duration-300">
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Type Badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-montserrat font-semibold ${config.color} backdrop-blur-sm`}>
            {config.label}
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Container */}
        <div className="p-5">
          {/* Title */}
          <h3 className="line-clamp-2 text-lg font-bebas font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">
            {title}
          </h3>

          {/* Location */}
          <p className="mb-4 text-sm font-montserrat text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
            <span>📍</span>
            {city}
          </p>

          {/* Price */}
          <p className="mb-4 text-2xl font-bebas font-bold text-primary tracking-tight">
            {formatPrice(price)}
          </p>

          {/* Features */}
          {(bedrooms !== null || bathrooms !== null) && (
            <div className="flex gap-4 text-xs font-montserrat text-neutral-600 dark:text-neutral-400 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              {bedrooms !== null && bedrooms > 0 && (
                <span className="flex items-center gap-1">
                  <span>🛏️</span>
                  {bedrooms} {bedrooms === 1 ? 'hab' : 'habs'}
                </span>
              )}
              {bathrooms !== null && bathrooms > 0 && (
                <span className="flex items-center gap-1">
                  <span>🚿</span>
                  {bathrooms} {bathrooms === 1 ? 'baño' : 'baños'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
