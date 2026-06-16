import { Router } from 'express';
import { asyncHandler } from '@/middleware/errorHandler';
import { AuthenticatedRequest, authenticateToken } from '@/middleware/auth';
import { Request, Response } from 'express';
import { db } from '@/config/supabase';
import { CreatorContent } from '@/types';

const router = Router();

// Generate content
router.post(
  '/generate',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { article_id, content_type, tone } = req.body;

    if (!article_id || !content_type) {
      return res.status(400).json({
        success: false,
        error: 'article_id and content_type are required',
        code: 'VALIDATION_ERROR',
      });
    }

    // TODO: Call AI service to generate content
    const generated_content = `Generated ${content_type} for article ${article_id} with ${tone} tone`;

    const content = await db.insert<CreatorContent>('creator_content', {
      user_id: req.user?.id,
      article_id,
      content_type,
      generated_content,
      platform: content_type.includes('instagram') ? 'instagram' : content_type.includes('twitter') ? 'twitter' : content_type.includes('youtube') ? 'youtube' : 'other',
      is_scheduled: false,
    });

    res.status(201).json({
      success: true,
      data: content,
    });
  })
);

// Get creator content
router.get(
  '/content',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const content = await db.query<CreatorContent>('creator_content', {
      user_id: req.user?.id,
    });

    res.json({
      success: true,
      data: {
        content,
        total: content.length,
      },
    });
  })
);

// Schedule post
router.post(
  '/schedule',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { content_id, platform, scheduled_at } = req.body;

    // TODO: Schedule post on external platform
    const updated = await db.update<CreatorContent>('creator_content', content_id, {
      platform,
      is_scheduled: true,
      scheduled_at,
    });

    res.json({
      success: true,
      data: updated,
    });
  })
);

// Publish content
router.post(
  '/publish/:id',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    // TODO: Publish to actual platforms
    const updated = await db.update<CreatorContent>('creator_content', id, {
      posted_at: new Date().toISOString(),
      engagement_metrics: {},
    });

    res.json({
      success: true,
      data: updated,
    });
  })
);

export default router;
