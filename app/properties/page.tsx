import { MainLayout } from '@/src/components/layout/MainLayout';
import { PropertyGrid } from '@/src/modules/properties/components/PropertyGrid';
import { PropertyRepository } from '@/src/modules/properties/repository';
import { prisma } from '@/src/core/database/prisma';

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
  const repository = new PropertyRepository(prisma);

  const filters = {
    type: params.type,
    operation: params.operation,
    city: params.city,
    page: params.page ? parseInt(params.page) : 1,
    limit: 12,
  };

  try {
    const result = await repository.findMany(filters);
    
    const properties = result.data.map((property) => ({
      id: property.id,
      title: property.title,
      price: property.price,
      city: property.city,
      type: property.type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      imageUrl: property.images[0]?.imageUrl || '/placeholder.jpg',
      slug: property.slug,
    }));

    return (
      <MainLayout>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
                Properties
              </h1>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Browse our {result.pagination.total} available properties
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Type
                </label>
                <select
                  defaultValue={params.type || ''}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                  onChange={(e) => {
                    const url = new URL(window.location.href);
                    if (e.target.value) url.searchParams.set('type', e.target.value);
                    else url.searchParams.delete('type');
                    window.location.href = url.toString();
                  }}
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
                  defaultValue={params.operation || ''}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                  onChange={(e) => {
                    const url = new URL(window.location.href);
                    if (e.target.value) url.searchParams.set('operation', e.target.value);
                    else url.searchParams.delete('operation');
                    window.location.href = url.toString();
                  }}
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
                  defaultValue={params.city || ''}
                  placeholder="Enter city"
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                  onChange={(e) => {
                    const url = new URL(window.location.href);
                    if (e.target.value) url.searchParams.set('city', e.target.value);
                    else url.searchParams.delete('city');
                  }}
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => (window.location.href = '/properties')}
                  className="w-full rounded-lg border border-neutral-300 px-4 py-2 font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-800"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Property Grid */}
            <PropertyGrid properties={properties} loading={false} />

            {/* Pagination */}
            {result.pagination.pages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {Array.from({ length: result.pagination.pages }).map((_, i) => (
                  <a
                    key={i + 1}
                    href={`/properties?page=${i + 1}`}
                    className={`rounded px-4 py-2 font-semibold transition-colors ${
                      result.pagination.page === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-neutral-300 text-neutral-900 hover:bg-neutral-50 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-800'
                    }`}
                  >
                    {i + 1}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    );
  } catch (error) {
    console.error('Failed to fetch properties:', error);

    return (
      <MainLayout>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Error Loading Properties
            </h1>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Please try again later
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }
}
