# PulseAI Database Schema

## Tables Overview

### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  interests TEXT[] DEFAULT ARRAY[]::text[],
  account_type VARCHAR(20) DEFAULT 'free', -- free, pro, creator
  subscription_status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  is_email_verified BOOLEAN DEFAULT false
);
```

### 2. News Sources Table
```sql
CREATE TABLE news_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  url TEXT NOT NULL,
  category VARCHAR(100),
  logo_url TEXT,
  trust_score DECIMAL(3, 2) DEFAULT 0.5, -- 0-1 scale
  credibility_rating INTEGER DEFAULT 50,
  is_active BOOLEAN DEFAULT true,
  article_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Articles/Stories Table
```sql
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content TEXT,
  summary TEXT, -- AI-generated
  source_id UUID REFERENCES news_sources(id),
  original_url TEXT UNIQUE NOT NULL,
  image_url TEXT,
  author VARCHAR(255),
  category VARCHAR(100),
  tags TEXT[] DEFAULT ARRAY[]::text[],
  published_at TIMESTAMP NOT NULL,
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  trending_score DECIMAL(5, 2) DEFAULT 0,
  trust_score DECIMAL(3, 2) DEFAULT 0.5,
  is_breaking BOOLEAN DEFAULT false,
  cluster_id UUID, -- For grouping duplicate stories
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Article Clusters Table
```sql
CREATE TABLE article_clusters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  main_article_id UUID REFERENCES articles(id),
  title VARCHAR(500),
  summary TEXT,
  event_date TIMESTAMP,
  trending_score DECIMAL(5, 2),
  article_count INTEGER DEFAULT 0,
  is_trending BOOLEAN DEFAULT false,
  trending_rank INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. User Preferences Table
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  interests TEXT[] DEFAULT ARRAY[]::text[],
  excluded_topics TEXT[] DEFAULT ARRAY[]::text[],
  preferred_sources UUID[] DEFAULT ARRAY[]::uuid[],
  notification_frequency VARCHAR(50) DEFAULT 'daily', -- real-time, hourly, daily
  is_notifications_enabled BOOLEAN DEFAULT true,
  theme VARCHAR(20) DEFAULT 'dark',
  language VARCHAR(10) DEFAULT 'en',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 6. User Interactions Table
```sql
CREATE TABLE user_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50) NOT NULL, -- view, like, save, share, click
  reading_time INTEGER, -- seconds
  engagement_score DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, article_id, interaction_type)
);
```

### 7. Saved Stories Table
```sql
CREATE TABLE saved_stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  folder_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, article_id)
);
```

### 8. User Follows Table
```sql
CREATE TABLE user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(follower_id, following_id)
);
```

### 9. Trending Topics Table
```sql
CREATE TABLE trending_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_name VARCHAR(255) UNIQUE NOT NULL,
  article_count INTEGER,
  trending_score DECIMAL(5, 2),
  trend_rank INTEGER,
  momentum_score DECIMAL(5, 2), -- How fast it's growing
  category VARCHAR(100),
  estimated_viral_potential DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 10. Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id),
  notification_type VARCHAR(100), -- breaking_news, trending, recommendation, alert
  title VARCHAR(255),
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP
);
```

### 11. Creator Content Table
```sql
CREATE TABLE creator_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID REFERENCES articles(id),
  content_type VARCHAR(50), -- instagram_caption, reel_script, youtube_short, twitter_thread
  generated_content TEXT NOT NULL,
  platform VARCHAR(50),
  is_scheduled BOOLEAN DEFAULT false,
  scheduled_at TIMESTAMP,
  posted_at TIMESTAMP,
  engagement_metrics JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 12. Alerts Table
```sql
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  alert_name VARCHAR(255),
  keywords TEXT[] DEFAULT ARRAY[]::text[],
  is_active BOOLEAN DEFAULT true,
  notification_method VARCHAR(100), -- push, email, both
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_trending_score ON articles(trending_score DESC);
CREATE INDEX idx_articles_cluster_id ON articles(cluster_id);
CREATE INDEX idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX idx_saved_stories_user_id ON saved_stories(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_trending_topics_score ON trending_topics(trending_score DESC);
```

## Row Level Security (RLS) Policies

Each table will have RLS policies to ensure:
- Users can only access their own data
- Public article data is readable by all authenticated users
- Admin users have full access
