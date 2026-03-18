import { prisma } from '../lib/prisma';

export async function listProducts(params: {
  category?: string;
  search?: string;
}) {
  const where: Record<string, unknown> = {};

  if (params.category) {
    where.category = { slug: params.category };
  }

  if (params.search) {
    where.name = { contains: params.search, mode: 'insensitive' };
  }

  return prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getRelatedProducts(categoryId: string, excludeSlug: string) {
  return prisma.product.findMany({
    where: { categoryId, slug: { not: excludeSlug } },
    include: { category: true },
    orderBy: { sortOrder: 'asc' },
    take: 4,
  });
}

export async function listCategories() {
  return prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: true } } },
  });
}
