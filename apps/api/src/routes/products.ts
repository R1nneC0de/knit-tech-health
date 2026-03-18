import { Router, Request, Response } from 'express';
import {
  listProducts,
  getProductBySlug,
  getRelatedProducts,
  listCategories,
} from '../services/product.service';

const router = Router();

router.get('/categories', async (_req: Request, res: Response) => {
  const categories = await listCategories();
  res.json(categories);
});

router.get('/products', async (req: Request, res: Response) => {
  const { category, search } = req.query;
  const products = await listProducts({
    category: category as string | undefined,
    search: search as string | undefined,
  });
  res.json(products);
});

router.get('/products/:slug', async (req: Request, res: Response) => {
  const product = await getProductBySlug(req.params.slug);
  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  const related = await getRelatedProducts(product.categoryId, product.slug);
  res.json({ ...product, relatedProducts: related });
});

export default router;
