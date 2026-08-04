import { MainLayout } from '@/src/components/layout/MainLayout';
import { PropertyDetail } from '@/src/modules/properties/components/PropertyDetail';
import { PropertyRepository } from '@/src/modules/properties/repository';
import { prisma } from '@/src/core/database/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: PropertyPageProps
): Promise<Metadata> {
  const { slug } = await params;
  const repository = new PropertyRepository(prisma);

  try {
    const property = await repository.findBySlug(slug);
    if (!property) return {};

    return {
      title: property.title,
      description: property.description.substring(0, 160),
      openGraph: {
        title: property.title,
        description: property.description,
        type: 'website',
        images: property.images.map((img) => ({
          url: img.imageUrl,
          alt: property.title,
        })),
      },
    };
  } catch {
    return {};
  }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const repository = new PropertyRepository(prisma);

  try {
    const property = await repository.findBySlug(slug);
    if (!property) {
      notFound();
    }

    return (
      <MainLayout>
        <div className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <PropertyDetail property={property} />
          </div>
        </div>
      </MainLayout>
    );
  } catch (error) {
    console.error('Failed to fetch property:', error);
    notFound();
  }
}
