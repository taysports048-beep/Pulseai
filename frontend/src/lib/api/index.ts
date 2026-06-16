import apiClient from '@/lib/api';
import { User, UserPreferences, CreatorContent, Alert } from '@/types';

export const userAPI = {
  async getProfile() {
    const response = await apiClient.get<{ success: boolean; data: User }>('/users/profile');
    return response.data.data;
  },

  async updateProfile(data: Partial<User>) {
    const response = await apiClient.put<{ success: boolean; data: User }>('/users/profile', data);
    return response.data.data;
  },

  async getPreferences() {
    const response = await apiClient.get<{ success: boolean; data: UserPreferences }>('/users/preferences');
    return response.data.data;
  },

  async updatePreferences(data: Partial<UserPreferences>) {
    const response = await apiClient.put<{ success: boolean; data: UserPreferences }>('/users/preferences', data);
    return response.data.data;
  },

  async getSavedArticles(page: number = 1, limit: number = 20) {
    const response = await apiClient.get('/users/saved', {
      params: { page, limit },
    });
    return response.data.data;
  },

  async saveArticle(articleId: string) {
    return apiClient.post('/users/saved', { article_id: articleId });
  },

  async recordInteraction(articleId: string, type: string, readingTime?: number) {
    return apiClient.post('/users/interactions', {
      article_id: articleId,
      interaction_type: type,
      reading_time: readingTime,
    });
  },
};

export const creatorAPI = {
  async generateContent(articleId: string, contentType: string, tone?: string) {
    const response = await apiClient.post<{ success: boolean; data: CreatorContent }>('/creator/generate', {
      article_id: articleId,
      content_type: contentType,
      tone,
    });
    return response.data.data;
  },

  async getContent(page: number = 1, limit: number = 20) {
    const response = await apiClient.get('/creator/content', {
      params: { page, limit },
    });
    return response.data.data;
  },

  async schedulePost(contentId: string, platform: string, scheduledAt: string) {
    const response = await apiClient.post<{ success: boolean; data: CreatorContent }>('/creator/schedule', {
      content_id: contentId,
      platform,
      scheduled_at: scheduledAt,
    });
    return response.data.data;
  },

  async publishContent(id: string) {
    const response = await apiClient.post<{ success: boolean; data: CreatorContent }>>(
      `/creator/publish/${id}`
    );
    return response.data.data;
  },
};

export const alertAPI = {
  async createAlert(name: string, keywords: string[], notificationMethod: string) {
    const response = await apiClient.post<{ success: boolean; data: Alert }>('/alerts', {
      alert_name: name,
      keywords,
      notification_method: notificationMethod,
    });
    return response.data.data;
  },

  async getAlerts() {
    const response = await apiClient.get<{ success: boolean; data: { alerts: Alert[] } }>>('/alerts');
    return response.data.data.alerts;
  },

  async updateAlert(id: string, data: Partial<Alert>) {
    const response = await apiClient.put<{ success: boolean; data: Alert }>(`/alerts/${id}`, data);
    return response.data.data;
  },

  async deleteAlert(id: string) {
    return apiClient.delete(`/alerts/${id}`);
  },
};
