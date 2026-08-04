import { PrismaClient } from '@prisma/client';
import { PropertyFilter } from '../validation';
import { PropertyDTO } from '../types';

export class PropertyRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: any) {
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50);

    return this.prisma.property.create({
      data: {
        ...data,
        slug: `${slug}-${Date.now()}`,
      },
      include: {
        images: true,
      },
    });
  }

  async findBySlug(slug: string): Promise<PropertyDTO | null> {
    const property = await this.prisma.property.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!property) return null;

    return this.mapToDTO(property);
  }

  async findById(id: string): Promise<PropertyDTO | null> {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!property) return null;

    return this.mapToDTO(property);
  }

  async findMany(filters: PropertyFilter) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      ...whereFilters
    } = filters;

    const where: any = {
      deletedAt: null,
      status: 'ACTIVE',
    };

    if (whereFilters.type) {
      where.type = whereFilters.type;
    }
    if (whereFilters.operation) {
      where.operation = whereFilters.operation;
    }
    if (whereFilters.city) {
      where.city = {
        contains: whereFilters.city,
        mode: 'insensitive',
      };
    }
    if (whereFilters.status) {
      where.status = whereFilters.status;
    }
    if (whereFilters.minPrice || whereFilters.maxPrice) {
      where.price = {};
      if (whereFilters.minPrice) {
        where.price.gte = whereFilters.minPrice;
      }
      if (whereFilters.maxPrice) {
        where.price.lte = whereFilters.maxPrice;
      }
    }
    if (whereFilters.bedrooms !== undefined) {
      where.bedrooms = whereFilters.bedrooms;
    }
    if (whereFilters.search) {
      where.OR = [
        { title: { contains: whereFilters.search, mode: 'insensitive' } },
        { description: { contains: whereFilters.search, mode: 'insensitive' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: {
          images: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: {
          [sortBy]: sortOrder,
        },
        skip,
        take: limit,
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      data: properties.map((p) => this.mapToDTO(p)),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getFeaturedProperties(limit: number = 6) {
    const properties = await this.prisma.property.findMany({
      where: {
        deletedAt: null,
        status: 'ACTIVE',
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });

    return properties.map((p) => this.mapToDTO(p));
  }

  private mapToDTO(property: any): PropertyDTO {
    return {
      id: property.id,
      slug: property.slug,
      title: property.title,
      description: property.description,
      type: property.type,
      operation: property.operation,
      status: property.status,
      price: property.price,
      currency: property.currency,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      city: property.city,
      province: property.province,
      address: property.address,
      latitude: property.latitude,
      longitude: property.longitude,
      images: (property.images || []).map((img: any) => ({
        id: img.id,
        imageUrl: img.imageUrl,
        isPrimary: img.isPrimary,
        order: img.order,
      })),
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    };
  }
}
