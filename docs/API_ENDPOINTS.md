# PulseAI API Endpoints

## Base URL
```
http://localhost:3001/api/v1
```

## Authentication Endpoints

### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password",
  "full_name": "Full Name"
}

Response: 201 Created
{
  "id": "uuid",
  "email": "user@example.com",
  "token": "jwt_token"
}
```

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}

Response: 200 OK
{
  "id": "uuid",
  "email": "user@example.com",
  "token": "jwt_token"
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer {token}

Response: 200 OK
```

## News Endpoints

### Get Personalized Feed
```
GET /news/feed?page=1&limit=20
Authorization: Bearer {token}

Response: 200 OK
{
  "articles": [
    {
      "id": "uuid",
      "title": "Article Title",
      "summary": "AI-generated summary",
      "source": "Source Name",
      "image_url": "https://...",
      "published_at": "2024-01-01T12:00:00Z",
      "trending_score": 92.5,
      "trust_score": 0.95
    }
  ],
  "total": 1500,
  "page": 1,
  "limit": 20
}
```

### Get Trending Articles
```
GET /news/trending?category=sports&limit=10
Authorization: Bearer {token}

Response: 200 OK
{
  "articles": [...],
  "trending_topics": [
    {
      "id": "uuid",
      "name": "Topic Name",
      "score": 95.5,
      "momentum": 85.2,
      "viral_potential": 0.92,
      "article_count": 342
    }
  ]
}
```

### Get Latest Articles
```
GET /news/latest?category=technology&limit=20
Authorization: Bearer {token}

Response: 200 OK
{
  "articles": [...],
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Search Articles
```
GET /news/search?q=keyword&category=sports&limit=50
Authorization: Bearer {token}

Response: 200 OK
{
  "articles": [
    {
      "id": "uuid",
      "title": "Search Result Title",
      "summary": "Why this matches your search...",
      "relevance_score": 0.98
    }
  ],
  "total": 523
}
```

### Get Single Article
```
GET /news/articles/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "uuid",
  "title": "Full Article",
  "content": "Full article content...",
  "summary": "AI summary",
  "source": {...},
  "related_articles": [...],
  "timeline": [
    {
      "date": "2024-01-01",
      "headline": "First report",
      "articles_count": 42
    }
  ]
}
```

### Get Story Timeline
```
GET /news/articles/{id}/timeline
Authorization: Bearer {token}

Response: 200 OK
{
  "topic": "Story Title",
  "timeline": [
    {
      "date": "2024-01-01",
      "update": "First report from...",
      "sources_count": 15,
      "articles": [...]
    }
  ]
}
```

## User Endpoints

### Get User Profile
```
GET /users/profile
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "username",
  "full_name": "Full Name",
  "avatar_url": "https://...",
  "bio": "User bio",
  "account_type": "pro",
  "interests": ["sports", "technology"]
}
```

### Update Preferences
```
PUT /users/preferences
Authorization: Bearer {token}
Content-Type: application/json

{
  "interests": ["sports", "technology", "finance"],
  "notification_frequency": "hourly",
  "theme": "dark"
}

Response: 200 OK
```

### Save Article
```
POST /users/saved
Authorization: Bearer {token}
Content-Type: application/json

{
  "article_id": "uuid"
}

Response: 201 Created
```

### Get Saved Articles
```
GET /users/saved?page=1&limit=20
Authorization: Bearer {token}

Response: 200 OK
{
  "articles": [...],
  "total": 45
}
```

### Like Article
```
POST /users/interactions/{article_id}/like
Authorization: Bearer {token}

Response: 200 OK
```

### Follow User
```
POST /users/{user_id}/follow
Authorization: Bearer {token}

Response: 200 OK
```

## Creator Endpoints

### Generate Content
```
POST /creator/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "article_id": "uuid",
  "content_type": "instagram_caption", // instagram_caption, reel_script, youtube_short, twitter_thread
  "tone": "professional" // professional, casual, humorous
}

Response: 201 Created
{
  "id": "uuid",
  "content_type": "instagram_caption",
  "generated_content": "...",
  "created_at": "2024-01-01T12:00:00Z"
}
```

### Get Creator Content
```
GET /creator/content?page=1&limit=20
Authorization: Bearer {token}

Response: 200 OK
{
  "content": [...],
  "total": 156
}
```

### Schedule Post
```
POST /creator/schedule
Authorization: Bearer {token}
Content-Type: application/json

{
  "content_id": "uuid",
  "platform": "instagram",
  "scheduled_at": "2024-01-02T14:30:00Z"
}

Response: 200 OK
```

## Alerts Endpoints

### Create Alert
```
POST /alerts
Authorization: Bearer {token}
Content-Type: application/json

{
  "alert_name": "Breaking News - Sports",
  "keywords": ["sports", "breaking", "live"],
  "notification_method": "push"
}

Response: 201 Created
```

### Get Alerts
```
GET /alerts
Authorization: Bearer {token}

Response: 200 OK
{
  "alerts": [...]
}
```

### Delete Alert
```
DELETE /alerts/{alert_id}
Authorization: Bearer {token}

Response: 204 No Content
```

## Error Responses

```
400 Bad Request
{
  "error": "Validation error message",
  "code": "VALIDATION_ERROR"
}

401 Unauthorized
{
  "error": "Invalid or expired token",
  "code": "UNAUTHORIZED"
}

404 Not Found
{
  "error": "Resource not found",
  "code": "NOT_FOUND"
}

429 Too Many Requests
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED"
}

500 Internal Server Error
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR"
}
```
