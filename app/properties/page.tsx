import { MainLayout } from '@/src/components/layout/MainLayout';
import { PropertyGrid } from '@/src/modules/properties/components/PropertyGrid';

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

  // Mock properties data - in production, this would come from an API route
  const properties = [
    {
      id: '1',
      title: 'Modern Apartment in Downtown',
      price: 250000,
      city: 'Buenos Aires',
      type: 'APARTMENT',
      bedrooms: 2,
      bathrooms: 1,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=400&fit=crop',
      slug: 'modern-apartment-downtown',
    },
    {
      id: '2',
      title: 'Spacious Family House',
      price: 450000,
      city: 'Rosario',
      type: 'HOUSE',
      bedrooms: 4,
      bathrooms: 2,
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop',
      slug: 'spacious-family-house',
    },
    {
      id: '3',
      title: 'Cozy Studio Apartment',
      price: 120000,
      city: 'Córdoba',
      type: 'APARTMENT',
      bedrooms: 1,
      bathrooms: 1,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=400&fit=crop',
      slug: 'cozy-studio-apartment',
    },
    {
      id: '4',
      title: 'Commercial Real Estate',
      price: 800000,
      city: 'Buenos Aires',
      type: 'COMMERCIAL',
      bedrooms: 0,
      bathrooms: 2,
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=400&fit=crop',
      slug: 'commercial-real-estate',
    },
    {
      id: '5',
      title: 'Vacant Land - Prime Location',
      price: 150000,
      city: 'Mendoza',
      type: 'LAND',
      bedrooms: 0,
      bathrooms: 0,
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-7049089f0e3b?w=500&h=400&fit=crop',
      slug: 'vacant-land-prime',
    },
    {
      id: '6',
      title: 'Luxury Penthouse',
      price: 1500000,
      city: 'Buenos Aires',
      type: 'APARTMENT',
      bedrooms: 3,
      bathrooms: 3,
      imageUrl: 'https://images.unsplash.com/photo-1512207736139-75198f84ec42?w=500&h=400&fit=crop',
      slug: 'luxury-penthouse',
    },
  ];

  return (
    <MainLayout>
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Properties
            </h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Browse our {properties.length} available properties
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
        </div>
      </div>
    </MainLayout>
  );
}
