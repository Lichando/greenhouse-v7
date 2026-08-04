import { MainLayout } from '@/src/components/layout/MainLayout';
import { PropertyGrid } from '@/src/modules/properties/components/PropertyGrid';
import { PropertyFilters } from '@/src/modules/properties/components/PropertyFilters';

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
      <div className="px-4 py-12 sm:px-6 lg:px-8 fade-in">
        <div className="mx-auto max-w-7xl">
          <div className="fade-in-up mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">
              Properties
            </h1>
            <p className="fade-in-up-1 mt-2 text-neutral-600 dark:text-neutral-400">
              Browse our {properties.length} available properties
            </p>
          </div>

          {/* Filters */}
          <div className="fade-in-up-2">
            <PropertyFilters
              type={params.type}
              operation={params.operation}
              city={params.city}
            />
          </div>

          {/* Property Grid */}
          <div className="fade-in-up-3">
            <PropertyGrid properties={properties} loading={false} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
