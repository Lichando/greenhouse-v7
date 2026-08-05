import { MainLayout } from '@/src/components/layout/MainLayout';
import { PropertyDetail } from '@/src/modules/properties/components/PropertyDetail';
import { PropertyRepository } from '@/src/modules/properties/repository';
import { getSupabaseAdmin } from '@/src/core/database/supabase';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

async function getProperty(slug: string) {
  const repository = new PropertyRepository(getSupabaseAdmin());
  return repository.findBySlug(slug);
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) return { title: 'Propiedad no encontrada | GREEN HOUSE' };

  return {
    title: `${property.title} | GREEN HOUSE`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.description,
      type: 'website',
      images: property.images[0]?.imageUrl ? [{ url: property.images[0].imageUrl, alt: property.title }] : undefined,
    },
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) notFound();

  return (
    <MainLayout>
      <div className="bg-neutral-50/60 px-4 py-10 dark:bg-neutral-950/30 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl fade-in-up">
          <PropertyDetail property={property} />
        </div>
      </div>
    </MainLayout>
  );
}
