import { MainLayout } from '@/src/components/layout/MainLayout';
import { PropertyDetail } from '@/src/modules/properties/components/PropertyDetail';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

const mockProperty = {
  id: '1',
  slug: 'modern-apartment-downtown',
  title: 'Departamento moderno en el centro',
  description: 'Hermoso departamento moderno ubicado en el corazón de Buenos Aires. Cuenta con ambientes amplios, excelente luz natural y terminaciones premium. Se encuentra cerca de restaurantes, comercios y transporte público.',
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
  address: 'Avenida Corrientes 123',
  latitude: -34.6037,
  longitude: -58.3816,
  createdAt: new Date('2026-07-15'),
  updatedAt: new Date('2026-08-04'),
  deletedAt: null,
  images: [
    {
      id: 'img-1', propertyId: '1',
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&h=700&fit=crop',
      isPrimary: true, order: 0, createdAt: new Date(),
    },
  ],
};

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === mockProperty.slug) {
    return {
      title: `${mockProperty.title} | GREEN HOUSE`,
      description: mockProperty.description.substring(0, 160),
      openGraph: { title: mockProperty.title, description: mockProperty.description, type: 'website', images: [{ url: mockProperty.images[0]?.imageUrl || '', alt: mockProperty.title }] },
    };
  }
  return {};
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  if (slug !== mockProperty.slug) notFound();

  return (
    <MainLayout>
      <div className="bg-neutral-50/60 px-4 py-10 dark:bg-neutral-950/30 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl fade-in-up">
          <PropertyDetail property={mockProperty} />
        </div>
      </div>
    </MainLayout>
  );
}
