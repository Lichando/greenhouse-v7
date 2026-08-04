'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PropertyCardProps } from '../types';
import { formatCurrency } from '../../../helpers/format';

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
  return (
    <Link href={`/properties/${slug}`}>
      <div className="group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content Container */}
        <div className="p-4">
          {/* Header */}
          <div className="mb-2 flex items-start justify-between">
            <h3 className="line-clamp-2 text-lg font-semibold text-neutral-900 dark:text-white">
              {title}
            </h3>
          </div>

          {/* Location */}
          <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
            {city}, {type}
          </p>

          {/* Price */}
          <p className="mb-3 text-xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(price)}
          </p>

          {/* Features */}
          {(bedrooms !== null || bathrooms !== null) && (
            <div className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              {bedrooms !== null && <span>🛏️ {bedrooms} bed</span>}
              {bathrooms !== null && <span>🚿 {bathrooms} bath</span>}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
