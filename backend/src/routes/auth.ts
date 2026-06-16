import { Router } from 'express';
import { asyncHandler } from '@/middleware/errorHandler';
import { AuthenticatedRequest, authenticateToken } from '@/middleware/auth';
import { Request, Response } from 'express';
import { db } from '@/config/supabase';
import { User, AuthResponse } from '@/types';
import { supabase } from '@/config/supabase';

const router = Router();

// Register
router.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, username, password, full_name } = req.body;

    if (!email || !username || !password || !full_name) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        code: 'VALIDATION_ERROR',
      });
    }

    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Create user profile in database
      const user = await db.insert<User>('users', {
        id: authData.user?.id,
        email,
        username,
        full_name,
        account_type: 'free',
        subscription_status: 'active',
        interests: [],
        is_active: true,
        is_email_verified: false,
      });

      // Create user preferences
      await db.insert('user_preferences', {
        user_id: user.id,
        interests: [],
        excluded_topics: [],
        preferred_sources: [],
        notification_frequency: 'daily',
        is_notifications_enabled: true,
        theme: 'dark',
        language: 'en',
      });

      res.status(201).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          user,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Registration failed',
        code: 'REGISTRATION_ERROR',
      });
    }
  })
);

// Login
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
        code: 'VALIDATION_ERROR',
      });
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Get user profile
      const user = await db.queryOne<User>('users', { id: data.user?.id });

      // Update last login
      if (user) {
        await db.update('users', user.id, {
          last_login: new Date().toISOString(),
        });
      }

      res.json({
        success: true,
        data: {
          id: data.user?.id,
          email: data.user?.email,
          token: data.session?.access_token,
          user,
        } as AuthResponse,
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error instanceof Error ? error.message : 'Login failed',
        code: 'LOGIN_ERROR',
      });
    }
  })
);

// Get Profile
router.get(
  '/profile',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const user = await db.queryOne<User>('users', { id: userId });

    res.json({
      success: true,
      data: user,
    });
  })
);

// Logout
router.post(
  '/logout',
  authenticateToken,
  asyncHandler(async (req: Request, res: Response) => {
    await supabase.auth.signOut();

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  })
);

export default router;
