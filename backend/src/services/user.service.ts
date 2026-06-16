import { User, UserPreferences, UserInteraction } from '@/types';
import { db } from '@/config/supabase';

export const userService = {
  async getUserProfile(userId: string) {
    try {
      const user = await db.queryOne<User>('users', { id: userId });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  async updateUserProfile(userId: string, data: Partial<User>) {
    try {
      const user = await db.update<User>('users', userId, {
        ...data,
        updated_at: new Date().toISOString(),
      });
      return user;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  async getUserPreferences(userId: string) {
    try {
      const preferences = await db.queryOne<UserPreferences>('user_preferences', {
        user_id: userId,
      });
      return preferences;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
  },

  async updateUserPreferences(userId: string, data: Partial<UserPreferences>) {
    try {
      // Check if preferences exist
      const existing = await this.getUserPreferences(userId);
      if (existing) {
        return db.update<UserPreferences>(
          'user_preferences',
          existing.id,
          data
        );
      } else {
        // Create new preferences
        return db.insert<UserPreferences>('user_preferences', {
          user_id: userId,
          ...data,
        });
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  },

  async recordInteraction(
    userId: string,
    articleId: string,
    interactionType: string,
    readingTime?: number
  ) {
    try {
      const interaction = await db.insert<UserInteraction>('user_interactions', {
        user_id: userId,
        article_id: articleId,
        interaction_type: interactionType,
        reading_time: readingTime,
        engagement_score: this.calculateEngagementScore(interactionType, readingTime),
      });
      return interaction;
    } catch (error) {
      console.error('Error recording interaction:', error);
      throw error;
    }
  },

  async getSavedArticles(userId: string, page: number = 1, limit: number = 20) {
    // TODO: Implement saved articles retrieval with pagination
    return { articles: [], total: 0, page, limit };
  },

  private calculateEngagementScore(
    interactionType: string,
    readingTime?: number
  ): number {
    let score = 0;
    switch (interactionType) {
      case 'view':
        score = 1;
        break;
      case 'like':
        score = 5;
        break;
      case 'save':
        score = 8;
        break;
      case 'share':
        score = 10;
        break;
      case 'click':
        score = 2;
        break;
    }

    // Boost score for longer reading time
    if (readingTime && readingTime > 60) {
      score += Math.min(readingTime / 60, 5); // Max 5 additional points
    }

    return Math.min(score, 10); // Cap at 10
  },
};
