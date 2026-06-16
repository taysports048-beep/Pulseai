import { create } from 'zustand';
import { User, Article, TrendingTopic, Notification } from '@/types';

interface StoreState {
  user: User | null;
  articles: Article[];
  trendingTopics: TrendingTopic[];
  notifications: Notification[];
  selectedCategory: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setArticles: (articles: Article[]) => void;
  setTrendingTopics: (topics: TrendingTopic[]) => void;
  setNotifications: (notifications: Notification[]) => void;
  setSelectedCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  user: null,
  articles: [],
  trendingTopics: [],
  notifications: [],
  selectedCategory: 'all',
  isLoading: false,
  error: null,
};

export const useStore = create<StoreState>((set) => ({
  ...initialState,

  setUser: (user) => set({ user }),
  setArticles: (articles) => set({ articles }),
  setTrendingTopics: (trendingTopics) => set({ trendingTopics }),
  setNotifications: (notifications) => set({ notifications }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));
