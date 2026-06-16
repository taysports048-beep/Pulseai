import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, asyncHandler } from './errorHandler';
import { supabase } from '@/config/supabase';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticateToken = asyncHandler(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Bearer {token}

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    try {
      const { data, error } = await supabase.auth.getUser(token);

      if (error || !data.user) {
        throw new UnauthorizedError('Invalid or expired token');
      }

      req.user = {
        id: data.user.id,
        email: data.user.email || '',
      };

      next();
    } catch (error) {
      throw new UnauthorizedError('Token verification failed');
    }
  }
);
