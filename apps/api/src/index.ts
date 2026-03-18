import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import contactRoutes from './routes/contact';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
}));
app.use(express.json());

// Routes
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', contactRoutes);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[API] Running on http://localhost:${PORT}`);
});
