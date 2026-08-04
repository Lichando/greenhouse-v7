import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Hash password for admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);

  // Create or update admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bienes.com' },
    update: {},
    create: {
      email: 'admin@bienes.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log('✓ Admin user created/updated:', admin.email);

  // Create example properties
  const properties = [
    {
      slug: 'departamento-rosario-centro',
      title: 'Departamento en Rosario Centro',
      description:
        'Hermoso departamento de 2 habitaciones en el corazón de Rosario. Ubicado en pleno centro, con acceso a todas las comodidades y servicios. Departamento luminoso con balcón corrido, cocina integrada y baños modernos.',
      type: 'APARTMENT' as const,
      operation: 'SALE' as const,
      status: 'ACTIVE' as const,
      price: 850000,
      bedrooms: 2,
      bathrooms: 1,
      area: 85,
      city: 'Rosario',
      province: 'Santa Fe',
      address: 'Avenida Pellegrini 1234',
      latitude: -32.94508,
      longitude: -60.63932,
      images: {
        create: [
          {
            imageUrl:
              'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
            isPrimary: true,
            order: 0,
          },
          {
            imageUrl:
              'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
            isPrimary: false,
            order: 1,
          },
        ],
      },
    },
    {
      slug: 'casa-rosario-norte',
      title: 'Casa en Rosario Norte',
      description:
        'Spacious house in a quiet neighborhood of Rosario Norte. Perfect for families with large garden, 3 bedrooms, and modern amenities. Close to schools, parks, and shopping areas.',
      type: 'HOUSE' as const,
      operation: 'SALE' as const,
      status: 'ACTIVE' as const,
      price: 1200000,
      bedrooms: 3,
      bathrooms: 2,
      area: 180,
      city: 'Rosario',
      province: 'Santa Fe',
      address: 'Calle Mitre 5678',
      latitude: -32.93442,
      longitude: -60.6515,
      images: {
        create: [
          {
            imageUrl:
              'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
            isPrimary: true,
            order: 0,
          },
          {
            imageUrl:
              'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
            isPrimary: false,
            order: 1,
          },
        ],
      },
    },
    {
      slug: 'terreno-comercial-rosario',
      title: 'Terreno Comercial en Rosario',
      description:
        'Commercial land in prime location, ideal for business development. Strategic location near main avenue with high traffic. Perfect for retail, office, or mixed-use development.',
      type: 'LAND' as const,
      operation: 'SALE' as const,
      status: 'ACTIVE' as const,
      price: 450000,
      area: 500,
      city: 'Rosario',
      province: 'Santa Fe',
      address: 'Bulevar Oroño 9012',
      latitude: -32.95172,
      longitude: -60.65432,
      images: {
        create: [
          {
            imageUrl:
              'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
            isPrimary: true,
            order: 0,
          },
        ],
      },
    },
  ];

  for (const propertyData of properties) {
    const property = await prisma.property.upsert({
      where: { slug: propertyData.slug },
      update: {
        title: propertyData.title,
        description: propertyData.description,
        price: propertyData.price,
      },
      create: propertyData,
    });

    console.log('✓ Property created/updated:', property.slug);
  }

  console.log('✅ Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
