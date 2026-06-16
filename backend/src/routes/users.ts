import { Router } from 'express';
import { asyncHandler } from '@/middleware/errorHandler';
import { AuthenticatedRequest, authenticateToken } from '@/middleware/auth';
import { Request, Response } from 'express';
import { userService } from '@/services/user.service';

const router = Router();

// Get user profile
router.get(
  '/profile',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await userService.getUserProfile(req.user?.id!);
    res.json({ success: true, data: user });
  })
);

// Update user profile
router.put(
  '/profile',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const user = await userService.updateUserProfile(req.user?.id!, req.body);
    res.json({ success: true, data: user });
  })
);

// Get preferences
router.get(
  '/preferences',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const prefs = await userService.getUserPreferences(req.user?.id!);
    res.json({ success: true, data: prefs });
  })
);

// Update preferences
router.put(
  '/preferences',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const prefs = await userService.updateUserPreferences(req.user?.id!, req.body);
    res.json({ success: true, data: prefs });
  })
);

// Save article
router.post(
  '/saved',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { article_id } = req.body;
    // TODO: Implement save logic
    res.json({ success: true });
  })
);

// Get saved articles
router.get(
  '/saved',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const saved = await userService.getSavedArticles(
      req.user?.id!,
      parseInt(req.query.page as string) || 1,
      parseInt(req.query.limit as string) || 20
    );
    res.json({ success: true, data: saved });
  })
);

// Record interaction
router.post(
  '/interactions',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { article_id, interaction_type, reading_time } = req.body;
    const interaction = await userService.recordInteraction(
      req.user?.id!,
      article_id,
      interaction_type,
      reading_time
    );
    res.json({ success: true, data: interaction });
  })
);

export default router;
