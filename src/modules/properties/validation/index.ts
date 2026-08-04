import { z } from 'zod';

export const PropertyTypeEnum = z.enum(['APARTMENT', 'HOUSE', 'LAND', 'COMMERCIAL']);
export const PropertyOperationEnum = z.enum(['SALE', 'RENT']);
export const PropertyStatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'SOLD', 'RENTED']);

export const CreatePropertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  type: PropertyTypeEnum,
  operation: PropertyOperationEnum,
  price: z.number().positive('Price must be positive'),
  currency: z.string().default('ARS'),
  bedrooms: z.number().int().positive().nullable().optional(),
  bathrooms: z.number().int().positive().nullable().optional(),
  area: z.number().positive().nullable().optional(),
  city: z.string().min(2),
  province: z.string().min(2),
  address: z.string().min(5),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
});

export const UpdatePropertySchema = CreatePropertySchema.partial();

export const PropertyFilterSchema = z.object({
  type: z.string().optional(),
  operation: z.string().optional(),
  city: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  sortBy: z.enum(['createdAt', 'price', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
}).strict();

export type CreatePropertyInput = z.infer<typeof CreatePropertySchema>;
export type UpdatePropertyInput = z.infer<typeof UpdatePropertySchema>;
export type PropertyFilter = z.infer<typeof PropertyFilterSchema>;
