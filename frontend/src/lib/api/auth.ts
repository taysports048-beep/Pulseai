import apiClient from '@/lib/api';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@/types';

export const authAPI = {
  async register(data: RegisterRequest) {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse }>('/auth/register', data);
    return response.data.data;
  },

  async login(data: LoginRequest) {
    const response = await apiClient.post<{ success: boolean; data: AuthResponse }>('/auth/login', data);
    const authData = response.data.data;
    if (authData.token) {
      localStorage.setItem('auth_token', authData.token);
    }
    return authData;
  },

  async logout() {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('auth_token');
  },

  async getProfile() {
    const response = await apiClient.get<{ success: boolean; data: User }>('/auth/profile');
    return response.data.data;
  },
};
