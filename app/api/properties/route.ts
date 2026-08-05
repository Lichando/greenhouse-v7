import { NextRequest, NextResponse } from 'next/server';
import { PropertyRepository } from '@/src/modules/properties/repository';
import { getSupabaseAdmin } from '@/src/core/database/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters = {
      type: searchParams.get('type') || undefined,
      operation: searchParams.get('operation') || undefined,
      city: searchParams.get('city') || undefined,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice') || '0') : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice') || '0') : undefined,
      page: parseInt(searchParams.get('page') || '1'),
      limit: Math.min(parseInt(searchParams.get('limit') || '10'), 100),
      sortBy: 'createdAt' as const,
      sortOrder: 'desc' as const,
    };

    const repository = new PropertyRepository(getSupabaseAdmin());
    const result = await repository.findMany(filters);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[v0] Properties API error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
