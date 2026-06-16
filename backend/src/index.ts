import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';

import { env } from '@/config/env';
import { errorHandler } from '@/middleware/errorHandler';
import healthRoutes from '@/routes/health';

const app = express();

// Security & Middleware
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: env.MAX_REQUESTS_PER_MINUTE,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Routes
app.use('/api/v1', healthRoutes);
// TODO: Add more routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/news', newsRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/creator', creatorRoutes);
// app.use('/api/v1/alerts', alertRoutes);

// Error Handler
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    code: 'NOT_FOUND',
  });
});

// Start Server
const PORT = env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 PulseAI API running on http://localhost:${PORT}`);
  console.log(`Environment: ${env.NODE_ENV}`);
});
