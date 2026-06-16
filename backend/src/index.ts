import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';

import { env } from '@/config/env';
import { errorHandler } from '@/middleware/errorHandler';
import healthRoutes from '@/routes/health';
import authRoutes from '@/routes/auth';
import newsRoutes from '@/routes/news';
import userRoutes from '@/routes/users';
import creatorRoutes from '@/routes/creator';
import alertRoutes from '@/routes/alerts';

const app = express();

// Security & Middleware
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: env.MAX_REQUESTS_PER_MINUTE,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use('/api/v1', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/creator', creatorRoutes);
app.use('/api/v1/alerts', alertRoutes);

// Error Handler
app.use(errorHandler);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    code: 'NOT_FOUND',
  });
});

// Start Server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`\n🚀 PulseAI API Server Started`);
  console.log(`📍 Running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${env.NODE_ENV}`);
  console.log(`🔒 CORS enabled for: ${env.FRONTEND_URL}\n`);
});

export default app;
