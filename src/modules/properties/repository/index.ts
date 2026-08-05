import type { SupabaseClient } from '@supabase/supabase-js';
import { PropertyFilter } from '../validation';
import { PropertyDTO } from '../types';

const SORT_COLUMNS = {
  createdAt: 'created_at',
  price: 'price',
  title: 'title',
} as const;

type PropertyRow = Record<string, any>;

export class PropertyRepository {
  constructor(private supabase: SupabaseClient) {}

  async create(data: Record<string, any>) {
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50);

    const { data: property, error } = await this.supabase
      .from('properties')
      .insert({
        ...data,
        id: crypto.randomUUID(),
        slug: `${slug}-${Date.now()}`,
      })
      .select('*, property_images(*)')
      .single();

    if (error) throw error;
    return property;
  }

  async findBySlug(slug: string): Promise<PropertyDTO | null> {
    const { data, error } = await this.supabase
      .from('properties')
      .select('*, property_images(*)')
      .eq('slug', slug)
      .eq('status', 'ACTIVE')
      .is('deleted_at', null)
      .maybeSingle();

    if (error) throw error;
    return data ? this.mapToDTO(data) : null;
  }

  async findById(id: string): Promise<PropertyDTO | null> {
    const { data, error } = await this.supabase
      .from('properties')
      .select('*, property_images(*)')
      .eq('id', id)
      .eq('status', 'ACTIVE')
      .is('deleted_at', null)
      .maybeSingle();

    if (error) throw error;
    return data ? this.mapToDTO(data) : null;
  }

  async findMany(filters: Partial<PropertyFilter> & { page?: number; limit?: number; sortBy?: keyof typeof SORT_COLUMNS; sortOrder?: 'asc' | 'desc' }) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      ...whereFilters
    } = filters;

    let query = this.supabase
      .from('properties')
      .select('*, property_images(*)', { count: 'exact' })
      .eq('status', whereFilters.status || 'ACTIVE')
      .is('deleted_at', null);

    if (whereFilters.type) query = query.eq('type', whereFilters.type);
    if (whereFilters.operation) query = query.eq('operation', whereFilters.operation);
    if (whereFilters.city) query = query.ilike('city', `%${whereFilters.city}%`);
    if (whereFilters.minPrice !== undefined) query = query.gte('price', whereFilters.minPrice);
    if (whereFilters.maxPrice !== undefined) query = query.lte('price', whereFilters.maxPrice);
    if (whereFilters.bedrooms !== undefined) query = query.eq('bedrooms', whereFilters.bedrooms);
    if (whereFilters.bathrooms !== undefined) query = query.eq('bathrooms', whereFilters.bathrooms);
    if (whereFilters.search) {
      const search = whereFilters.search.replace(/[,()]/g, ' ');
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, count, error } = await query
      .order(SORT_COLUMNS[sortBy], { ascending: sortOrder === 'asc' })
      .range(from, to);

    if (error) throw error;

    const total = count ?? 0;
    return {
      data: (data ?? []).map((property) => this.mapToDTO(property)),
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    };
  }

  async getFeaturedProperties(limit = 6) {
    const { data, error } = await this.supabase
      .from('properties')
      .select('*, property_images(*)')
      .eq('status', 'ACTIVE')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return (data ?? []).map((property) => this.mapToDTO(property));
  }

  private mapToDTO(property: PropertyRow): PropertyDTO {
    const images = property.property_images ?? [];

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
      images: images
        .sort((a: PropertyRow, b: PropertyRow) => a.order - b.order)
        .map((image: PropertyRow) => ({
          id: image.id,
          imageUrl: image.image_url,
          isPrimary: image.is_primary,
          order: image.order,
        })),
      createdAt: new Date(property.created_at),
      updatedAt: new Date(property.updated_at),
    };
  }
}
