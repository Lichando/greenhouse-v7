export interface PropertyFilters {
  type?: string;
  operation?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'price' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface PropertyDTO {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  operation: string;
  status: string;
  price: number;
  currency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  area: number | null;
  city: string;
  province: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  images: Array<{
    id: string;
    imageUrl: string;
    isPrimary: boolean;
    order: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface PropertyCardProps {
  id: string;
  title: string;
  price: number;
  city: string;
  type: string;
  bedrooms: number | null;
  bathrooms: number | null;
  imageUrl: string;
  slug: string;
}
