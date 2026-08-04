'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface PropertyFiltersProps {
  type?: string;
  operation?: string;
  city?: string;
}

export function PropertyFilters({ type, operation, city }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (filterName: string, filterValue: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (filterValue) {
        params.set(filterName, filterValue);
      } else {
        params.delete(filterName);
      }
      router.push(`/properties?${params.toString()}`);
    });
  };

  const handleClearFilters = () => {
    startTransition(() => {
      router.push('/properties');
    });
  };

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Type
        </label>
        <select
          value={type || ''}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          disabled={isPending}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        >
          <option value="">All Types</option>
          <option value="APARTMENT">Apartment</option>
          <option value="HOUSE">House</option>
          <option value="LAND">Land</option>
          <option value="COMMERCIAL">Commercial</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Operation
        </label>
        <select
          value={operation || ''}
          onChange={(e) => handleFilterChange('operation', e.target.value)}
          disabled={isPending}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        >
          <option value="">All Operations</option>
          <option value="SALE">For Sale</option>
          <option value="RENT">For Rent</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          City
        </label>
        <input
          type="text"
          value={city || ''}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          disabled={isPending}
          placeholder="Enter city"
          className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        />
      </div>

      <div className="flex items-end">
        <button
          onClick={handleClearFilters}
          disabled={isPending}
          className="w-full rounded-lg border border-neutral-300 px-4 py-2 font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-800"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
