'use client';

import Image from 'next/image';
import { PropertyDTO } from '../types';
import { formatCurrency } from '../../../helpers/format';

interface PropertyDetailProps {
  property: PropertyDTO;
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const primaryImage = property.images.find((img) => img.isPrimary) || property.images[0];

  return (
    <div className="space-y-8">
      {/* Image Gallery */}
      <div className="space-y-4">
        {primaryImage && (
          <div className="relative h-96 w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
            <Image
              src={primaryImage.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {property.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {property.images.map((image) => (
              <div key={image.id} className="relative h-20 w-full overflow-hidden rounded">
                <Image
                  src={image.imageUrl}
                  alt={`${property.title} - ${image.order}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="mb-2 inline-block rounded bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-900 dark:bg-blue-900 dark:text-blue-100">
                {property.operation} - {property.type}
              </div>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
                {property.title}
              </h1>
              <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
                {property.address}, {property.city}, {property.province}
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {property.bedrooms !== null && (
                <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Bedrooms</p>
                  <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                    {property.bedrooms}
                  </p>
                </div>
              )}
              {property.bathrooms !== null && (
                <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Bathrooms</p>
                  <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                    {property.bathrooms}
                  </p>
                </div>
              )}
              {property.area !== null && (
                <div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Area</p>
                  <p className="text-2xl font-semibold text-neutral-900 dark:text-white">
                    {property.area}m²
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
                Description
              </h2>
              <p className="whitespace-pre-line text-neutral-700 dark:text-neutral-300">
                {property.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="sticky top-4 space-y-4 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div>
              <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-400">Price</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(property.price)}
              </p>
            </div>

            <div className="space-y-2">
              <button className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                Schedule Viewing
              </button>
              <button className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
                Contact Agent
              </button>
            </div>

            <div className="space-y-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Type:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {property.type}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Status:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {property.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Posted:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  {new Date(property.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
