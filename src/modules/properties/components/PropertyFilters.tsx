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
    <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-4 p-6 bg-gradient-to-r from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl border border-primary/10 dark:border-primary/20">
      <div>
        <label className="block text-xs sm:text-sm font-montserrat font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Tipo
        </label>
        <select
          value={type || ''}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          disabled={isPending}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-2.5 text-sm font-montserrat transition-all hover:border-primary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        >
          <option value="">Todos</option>
          <option value="APARTMENT">Departamento</option>
          <option value="HOUSE">Casa</option>
          <option value="LAND">Terreno</option>
          <option value="COMMERCIAL">Comercial</option>
        </select>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-montserrat font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Operación
        </label>
        <select
          value={operation || ''}
          onChange={(e) => handleFilterChange('operation', e.target.value)}
          disabled={isPending}
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-2.5 text-sm font-montserrat transition-all hover:border-primary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        >
          <option value="">Todas</option>
          <option value="SALE">Venta</option>
          <option value="RENT">Alquiler</option>
        </select>
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-montserrat font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Ciudad
        </label>
        <input
          type="text"
          value={city || ''}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          disabled={isPending}
          placeholder="Ingresa ciudad"
          className="w-full rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white px-4 py-2.5 text-sm font-montserrat placeholder-neutral-400 dark:placeholder-neutral-500 transition-all hover:border-primary/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        />
      </div>

      <div className="flex items-end">
        <button
          onClick={handleClearFilters}
          disabled={isPending}
          className="w-full rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 px-4 py-2.5 font-montserrat font-semibold text-neutral-900 dark:text-white transition-all hover:bg-primary hover:text-white hover:border-primary disabled:opacity-50"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
