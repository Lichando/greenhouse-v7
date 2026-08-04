import { MainLayout } from '@/src/components/layout/MainLayout';
import { PropertyDetail } from '@/src/modules/properties/components/PropertyDetail';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

// Mock property data - in production, this would come from API
const mockProperty = {
  id: '1',
  slug: 'modern-apartment-downtown',
  title: 'Modern Apartment in Downtown',
  description: 'Beautiful modern apartment located in the heart of downtown Buenos Aires. Features high ceilings, natural light, and premium finishes. Close to restaurants, shopping, and public transportation.',
  type: 'APARTMENT',
  operation: 'SALE',
  status: 'ACTIVE',
  price: 250000,
  currency: 'ARS',
  bedrooms: 2,
  bathrooms: 1,
  area: 85,
  city: 'Buenos Aires',
  province: 'Buenos Aires',
  address: '123 Corrientes Avenue',
  latitude: -34.6037,
  longitude: -58.3816,
  createdAt: new Date('2026-07-15'),
  updatedAt: new Date('2026-08-04'),
  deletedAt: null,
  images: [
    {
      id: 'img-1',
      propertyId: '1',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&h=700&fit=crop',
      isPrimary: true,
      order: 0,
      createdAt: new Date(),
    },
  ],
};

export async function generateMetadata(
  { params }: PropertyPageProps
): Promise<Metadata> {
  const { slug } = await params;

  // In a real app, this would fetch from the database
  if (slug === 'modern-apartment-downtown') {
    return {
      title: mockProperty.title,
      description: mockProperty.description.substring(0, 160),
      openGraph: {
        title: mockProperty.title,
        description: mockProperty.description,
        type: 'website',
        images: mockProperty.images.map((img) => ({
          url: img.imageUrl,
          alt: mockProperty.title,
        })),
      },
    };
  }

  return {};
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;

  // In a real app, this would fetch from the database
  if (slug !== 'modern-apartment-downtown') {
    notFound();
  }

  return (
    <MainLayout>
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <PropertyDetail property={mockProperty} />
        </div>
      </div>
    </MainLayout>
  );
}
