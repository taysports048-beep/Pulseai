import { db } from '@/config/supabase';
import { CreatorContent, Article } from '@/types';

export const recommendationService = {
  async getRecommendations(userId: string, limit: number = 10) {
    try {
      // 1. Get user preferences
      const userPrefs = await db.query('user_preferences', { user_id: userId });
      if (!userPrefs || userPrefs.length === 0) {
        // Return trending articles if no preferences
        return this.getTrendingRecommendations(limit);
      }

      // 2. Get user interaction history
      const interactions = await db.query('user_interactions', { user_id: userId });

      // 3. Score articles based on preferences and interactions
      const articles = await db.query<Article>('articles');

      const scoredArticles = articles.map((article) => {
        let score = 0;

        // Match interests
        const prefs = userPrefs[0] as any;
        if (prefs.interests && Array.isArray(prefs.interests)) {
          const matchingInterests = prefs.interests.filter((i: string) =>
            article.tags.some((t) => t.toLowerCase().includes(i.toLowerCase()))
          );
          score += matchingInterests.length * 10;
        }

        // Boost trending articles
        score += article.trending_score * 0.5;

        // Boost high-trust articles
        score += article.trust_score * 15;

        // Penalize if in excluded topics
        if (prefs.excluded_topics && Array.isArray(prefs.excluded_topics)) {
          const excluded = prefs.excluded_topics.some((t: string) =>
            article.tags.some((a) => a.toLowerCase().includes(t.toLowerCase()))
          );
          if (excluded) score -= 100;
        }

        return { ...article, recommendation_score: score };
      });

      // Sort by score and return top results
      return scoredArticles.sort((a, b) => b.recommendation_score - a.recommendation_score).slice(0, limit);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  },

  async getTrendingRecommendations(limit: number = 10) {
    try {
      const articles = await db.query<Article>('articles');
      return articles.sort((a, b) => b.trending_score - a.trending_score).slice(0, limit);
    } catch (error) {
      console.error('Error getting trending recommendations:', error);
      throw error;
    }
  },

  async getSimilarArticles(articleId: string, limit: number = 5) {
    try {
      const article = await db.queryOne<Article>('articles', { id: articleId });
      if (!article) {
        throw new Error('Article not found');
      }

      // Find articles with similar tags
      const allArticles = await db.query<Article>('articles');
      const similar = allArticles
        .filter((a) => a.id !== articleId)
        .map((a) => {
          const commonTags = a.tags.filter((t) => article.tags.includes(t));
          return { ...a, similarity_score: commonTags.length };
        })
        .sort((a, b) => b.similarity_score - a.similarity_score)
        .slice(0, limit);

      return similar;
    } catch (error) {
      console.error('Error getting similar articles:', error);
      throw error;
    }
  },
};
