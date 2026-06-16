import { Router, Request, Response } from 'express';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

router.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'PulseAI API',
    version: '0.1.0',
    message: 'Welcome to PulseAI API',
  });
});

export default router;
