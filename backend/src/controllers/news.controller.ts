import { Request, Response } from 'express';
import { newsService } from '@/services/news.service';
import { asyncHandler } from '@/middleware/errorHandler';
import { AuthenticatedRequest } from '@/middleware/auth';

export const newsController = {
  getPersonalizedFeed: asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const result = await newsService.getPersonalizedFeed(userId!, page, limit);

    res.json({
      success: true,
      data: result,
    });
  }),

  getTrendingArticles: asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const topics = await newsService.getTrendingTopics(limit);

    res.json({
      success: true,
      data: { trending_topics: topics },
    });
  }),

  getLatestArticles: asyncHandler(async (req: Request, res: Response) => {
    const category = req.query.category as string | undefined;
    const limit = parseInt(req.query.limit as string) || 20;

    const articles = await newsService.getLatestArticles(category, limit);

    res.json({
      success: true,
      data: { articles },
    });
  }),

  searchArticles: asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.q as string;
    const category = req.query.category as string | undefined;
    const limit = parseInt(req.query.limit as string) || 50;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required',
        code: 'VALIDATION_ERROR',
      });
    }

    const result = await newsService.searchArticles(query, category, limit);

    res.json({
      success: true,
      data: result,
    });
  }),

  getArticleById: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const article = await newsService.getArticleById(id);

    res.json({
      success: true,
      data: article,
    });
  }),

  getArticleTimeline: asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const timeline = await newsService.getArticleTimeline(id);

    res.json({
      success: true,
      data: { timeline },
    });
  }),
};
