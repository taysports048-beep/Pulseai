// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  account_type: 'free' | 'pro' | 'creator';
  subscription_status: 'active' | 'inactive' | 'cancelled';
  interests: string[];
  created_at: string;
  updated_at: string;
  last_login?: string;
  is_active: boolean;
  is_email_verified: boolean;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  interests: string[];
  excluded_topics: string[];
  preferred_sources: string[];
  notification_frequency: 'real-time' | 'hourly' | 'daily';
  is_notifications_enabled: boolean;
  theme: 'dark' | 'light';
  language: string;
  updated_at: string;
}

// Article Types
export interface Article {
  id: string;
  title: string;
  description: string;
  content?: string;
  summary: string;
  source: NewsSource;
  original_url: string;
  image_url?: string;
  author?: string;
  category: string;
  tags: string[];
  published_at: string;
  fetched_at: string;
  trending_score: number;
  trust_score: number;
  is_breaking: boolean;
  cluster_id?: string;
  view_count: number;
  like_count: number;
  share_count: number;
  created_at: string;
}

export interface ArticleCluster {
  id: string;
  main_article_id: string;
  title: string;
  summary: string;
  event_date: string;
  trending_score: number;
  article_count: number;
  is_trending: boolean;
  trending_rank?: number;
  articles: Article[];
  created_at: string;
  updated_at: string;
}

export interface ArticleTimeline {
  date: string;
  update: string;
  sources_count: number;
  articles: Article[];
}

// News Source Types
export interface NewsSource {
  id: string;
  name: string;
  url: string;
  category?: string;
  logo_url?: string;
  trust_score: number;
  credibility_rating: number;
  is_active: boolean;
  article_count: number;
  created_at: string;
  updated_at: string;
}

// Trending Types
export interface TrendingTopic {
  id: string;
  topic_name: string;
  article_count: number;
  trending_score: number;
  trend_rank: number;
  momentum_score: number;
  category?: string;
  estimated_viral_potential: number;
  created_at: string;
  updated_at: string;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  article_id?: string;
  notification_type: 'breaking_news' | 'trending' | 'recommendation' | 'alert';
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  read_at?: string;
}

// Creator Types
export interface CreatorContent {
  id: string;
  user_id: string;
  article_id?: string;
  content_type: 'instagram_caption' | 'reel_script' | 'youtube_short' | 'twitter_thread';
  generated_content: string;
  platform: string;
  is_scheduled: boolean;
  scheduled_at?: string;
  posted_at?: string;
  engagement_metrics?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Alert Types
export interface Alert {
  id: string;
  user_id: string;
  alert_name: string;
  keywords: string[];
  is_active: boolean;
  notification_method: 'push' | 'email' | 'both';
  created_at: string;
  updated_at: string;
}

// User Interaction Types
export interface UserInteraction {
  id: string;
  user_id: string;
  article_id: string;
  interaction_type: 'view' | 'like' | 'save' | 'share' | 'click';
  reading_time?: number;
  engagement_score?: number;
  created_at: string;
}

// Feed Types
export interface FeedResponse {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchResponse {
  articles: Article[];
  total: number;
  page?: number;
  limit?: number;
}

export interface TrendingResponse {
  articles: Article[];
  trending_topics: TrendingTopic[];
}

// Auth Types
export interface AuthResponse {
  id: string;
  email: string;
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  full_name: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
