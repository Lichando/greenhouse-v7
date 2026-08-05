import { MainLayout } from '@/src/components/layout/MainLayout';
import { PropertyGrid } from '@/src/modules/properties/components/PropertyGrid';
import { PropertyFilters } from '@/src/modules/properties/components/PropertyFilters';
import { PropertyRepository } from '@/src/modules/properties/repository';
import { getSupabaseAdmin } from '@/src/core/database/supabase';

interface PropertiesPageProps {
  searchParams: Promise<{
    type?: string;
    operation?: string;
    city?: string;
    page?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;
  const repository = new PropertyRepository(getSupabaseAdmin());
  const result = await repository.findMany({
    type: params.type,
    operation: params.operation,
    city: params.city,
    page: Number(params.page ?? 1),
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  return (
    <MainLayout>
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="fade-in-up mb-12">
            <h1 className="font-bebas text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">PROPIEDADES</h1>
            <p className="fade-in-up-1 mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
              Descubrí oportunidades inmobiliarias seleccionadas para vos. Encontramos {result.pagination.total} propiedades disponibles.
            </p>
          </div>
          <div className="fade-in-up-2 mb-8">
            <PropertyFilters type={params.type} operation={params.operation} city={params.city} />
          </div>
          <div className="fade-in-up-3">
            <PropertyGrid
              properties={result.data.map((property) => ({
                id: property.id,
                title: property.title,
                price: property.price,
                city: property.city,
                type: property.type,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                imageUrl: property.images[0]?.imageUrl ?? '/placeholder.svg',
                slug: property.slug,
              }))}
              loading={false}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
