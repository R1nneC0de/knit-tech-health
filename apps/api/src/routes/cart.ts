import { Router, Request, Response } from 'express';
import type { Router as IRouter } from 'express';
import { z } from 'zod';
import { validate } from '../middleware/validate';
import { requireAuth } from '../middleware/auth';
import {
  getOrCreateCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../services/cart.service';

const router: IRouter = Router();

router.use(requireAuth);

router.get('/cart', async (req: Request, res: Response) => {
  const cart = await getOrCreateCart(req.user!.id);
  res.json(cart);
});

const addItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().default(1),
});

router.post('/cart/items', validate(addItemSchema), async (req: Request, res: Response) => {
  try {
    const cart = await addToCart(req.user!.id, req.body.productId, req.body.quantity);
    res.json(cart);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to add item';
    res.status(400).json({ error: msg });
  }
});

const updateItemSchema = z.object({ quantity: z.number().int().min(0) });

router.patch('/cart/items/:itemId', validate(updateItemSchema), async (req: Request, res: Response) => {
  try {
    const cart = await updateCartItem(req.user!.id, req.params.itemId, req.body.quantity);
    res.json(cart);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to update item';
    res.status(400).json({ error: msg });
  }
});

router.delete('/cart/items/:itemId', async (req: Request, res: Response) => {
  try {
    const cart = await removeCartItem(req.user!.id, req.params.itemId);
    res.json(cart);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to remove item';
    res.status(400).json({ error: msg });
  }
});

router.delete('/cart', async (req: Request, res: Response) => {
  await clearCart(req.user!.id);
  res.json({ message: 'Cart cleared' });
});

export default router;
