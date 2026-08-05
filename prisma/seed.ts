import { getSupabaseAdmin } from '../src/core/database/supabase';

const supabase = getSupabaseAdmin();

const properties = [
  {
    id: 'property-rosario-centro',
    slug: 'departamento-rosario-centro',
    title: 'Departamento en Rosario Centro',
    description: 'Hermoso departamento de 2 habitaciones en el corazón de Rosario.',
    type: 'APARTMENT',
    operation: 'SALE',
    status: 'ACTIVE',
    price: 850000,
    currency: 'ARS',
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    city: 'Rosario',
    province: 'Santa Fe',
    address: 'Avenida Pellegrini 1234',
    latitude: -32.94508,
    longitude: -60.63932,
  },
  {
    id: 'property-rosario-norte',
    slug: 'casa-rosario-norte',
    title: 'Casa en Rosario Norte',
    description: 'Casa amplia en un barrio tranquilo de Rosario Norte.',
    type: 'HOUSE',
    operation: 'SALE',
    status: 'ACTIVE',
    price: 1200000,
    currency: 'ARS',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    city: 'Rosario',
    province: 'Santa Fe',
    address: 'Calle Mitre 5678',
    latitude: -32.93442,
    longitude: -60.6515,
  },
];

async function main() {
  for (const property of properties) {
    const { error } = await supabase.from('properties').upsert(property, { onConflict: 'slug' });
    if (error) throw error;
  }
  console.log(`Seeded ${properties.length} properties in Supabase.`);
}

main().catch((error) => {
  console.error('Supabase seed failed:', error);
  process.exit(1);
});
