export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } },
) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, slug: { not: params.slug } },
    include: { category: true },
    orderBy: { sortOrder: 'asc' },
    take: 4,
  });

  return NextResponse.json({ ...product, relatedProducts: related });
}
