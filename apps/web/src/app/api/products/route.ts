export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const where: Record<string, unknown> = {};
  if (category) where.category = { slug: category };
  if (search) where.name = { contains: search, mode: 'insensitive' };

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });
  return NextResponse.json(products);
}
