import { Router } from 'express';
import { asyncHandler } from '@/middleware/errorHandler';
import { AuthenticatedRequest, authenticateToken } from '@/middleware/auth';
import { Request, Response } from 'express';
import { newsController } from '@/controllers/news.controller';

const router = Router();

// Public routes
router.get('/trending', newsController.getTrendingArticles);
router.get('/latest', newsController.getLatestArticles);
router.get('/search', newsController.searchArticles);
router.get('/articles/:id', newsController.getArticleById);
router.get('/articles/:id/timeline', newsController.getArticleTimeline);

// Protected routes
router.get('/feed', authenticateToken, newsController.getPersonalizedFeed);
router.post(
  '/articles/:id/view',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    // Track article view
    res.json({ success: true });
  })
);

export default router;
