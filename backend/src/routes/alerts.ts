import { Router } from 'express';
import { asyncHandler } from '@/middleware/errorHandler';
import { AuthenticatedRequest, authenticateToken } from '@/middleware/auth';
import { Request, Response } from 'express';
import { db } from '@/config/supabase';
import { Alert } from '@/types';

const router = Router();

// Create alert
router.post(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { alert_name, keywords, notification_method } = req.body;

    const alert = await db.insert<Alert>('alerts', {
      user_id: req.user?.id,
      alert_name,
      keywords,
      notification_method: notification_method || 'push',
      is_active: true,
    });

    res.status(201).json({
      success: true,
      data: alert,
    });
  })
);

// Get alerts
router.get(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const alerts = await db.query<Alert>('alerts', {
      user_id: req.user?.id,
    });

    res.json({
      success: true,
      data: { alerts },
    });
  })
);

// Update alert
router.put(
  '/:id',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const updated = await db.update<Alert>('alerts', id, req.body);

    res.json({
      success: true,
      data: updated,
    });
  })
);

// Delete alert
router.delete(
  '/:id',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    await db.delete('alerts', id);

    res.json({
      success: true,
      message: 'Alert deleted',
    });
  })
);

export default router;
