import apiClient from '@/lib/api';
import { Article, FeedResponse, SearchResponse, TrendingResponse } from '@/types';

export const newsAPI = {
  async getPersonalizedFeed(page: number = 1, limit: number = 20) {
    const response = await apiClient.get<{ success: boolean; data: FeedResponse }>('/news/feed', {
      params: { page, limit },
    });
    return response.data.data;
  },

  async getTrendingArticles(limit: number = 10, category?: string) {
    const response = await apiClient.get<{ success: boolean; data: TrendingResponse }>('/news/trending', {
      params: { limit, category },
    });
    return response.data.data;
  },

  async getLatestArticles(limit: number = 20, category?: string) {
    const response = await apiClient.get<{ success: boolean; data: { articles: Article[] } }>>('/news/latest', {
      params: { limit, category },
    });
    return response.data.data.articles;
  },

  async searchArticles(query: string, category?: string, limit: number = 50) {
    const response = await apiClient.get<{ success: boolean; data: SearchResponse }>('/news/search', {
      params: { q: query, category, limit },
    });
    return response.data.data;
  },

  async getArticle(id: string) {
    const response = await apiClient.get<{ success: boolean; data: Article }>(`/news/articles/${id}`);
    return response.data.data;
  },

  async getArticleTimeline(id: string) {
    const response = await apiClient.get(`/news/articles/${id}/timeline`);
    return response.data.data.timeline;
  },

  async trackView(id: string) {
    return apiClient.post(`/news/articles/${id}/view`);
  },
};
