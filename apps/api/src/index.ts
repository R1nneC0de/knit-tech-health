import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import contactRoutes from './routes/contact';
import authRoutes from './routes/auth';
import cartRoutes from './routes/cart';
import checkoutRoutes from './routes/checkout';
import webhookRoutes from './routes/webhooks';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Stripe webhooks need raw body — must be before express.json()
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);

app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', contactRoutes);
app.use('/api', cartRoutes);
app.use('/api', checkoutRoutes);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[API] Running on http://localhost:${PORT}`);
});
