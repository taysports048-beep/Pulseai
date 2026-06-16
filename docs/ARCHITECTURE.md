# PulseAI Architecture

## System Overview

PulseAI is built using a modern microservices architecture with:

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Express.js API with Node.js
- **Database**: PostgreSQL via Supabase
- **Real-time**: Supabase Real-time subscriptions
- **AI/ML**: Custom Python services for NLP and recommendations

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                   Client Applications                     │
│              (Web, Mobile, Desktop Clients)               │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   ┌────▼──────┐          ┌──────▼─────┐
   │  Frontend  │          │   WebSocket │
   │ (Next.js)  │          │  Connection │
   └────┬───────┘          └──────┬──────┘
        │                         │
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │    Backend API Layer    │
        │  (Express.js / Node.js) │
        └────────────┬────────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        │            │            │              │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐ ┌──────▼──┐
   │  Auth   │ │  News   │ │  Search │ │  Cache  │
   │ Service │ │ Service │ │ Service │ │ (Redis) │
   └────┬────┘ └────┬────┘ └────┬────┘ └─────────┘
        │            │           │
        └────────────┼───────────┘
                     │
        ┌────────────▼────────────┐
        │   Database Layer        │
        │  (PostgreSQL/Supabase)  │
        └────────────┬────────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        │            │            │              │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐ ┌──────▼──┐
   │  Users  │ │  Stories │ │  Sources│ │Trending │
   │  Table  │ │  Table   │ │  Table  │ │ Scores  │
   └─────────┘ └──────────┘ └─────────┘ └─────────┘

        ┌────────────────────────────┐
        │    AI/ML Services Layer    │
        │  (Python - Separate Procs) │
        └────────────┬───────────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        │            │            │              │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐ ┌──────▼──┐
   │Clustering│ │ Summary │ │Recommend│ │ Trends  │
   │  Engine  │ │ Service │ │ Engine  │ │Detection│
   └──────────┘ └─────────┘ └─────────┘ └─────────┘

        ┌────────────────────────────┐
        │   External Data Sources    │
        └────────────┬───────────────┘
                     │
        ┌────────────┼────────────┬──────────────┐
        │            │            │              │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐ ┌──────▼──┐
   │ Websites │ │ Reddit  │ │ YouTube │ │ Podcasts│
   │  & Blogs │ │ Posts   │ │ Videos  │ │& Audio  │
   └──────────┘ └─────────┘ └─────────┘ └─────────┘
```

## Core Components

### 1. Frontend (Next.js)
- **Pages**: Home, Trending, Latest, Following, Creator Studio, Profile
- **Components**: Article cards, feed, search, filters
- **State Management**: Zustand for global state
- **Authentication**: Supabase Auth integration
- **Real-time Updates**: WebSocket subscriptions

### 2. Backend API (Express.js)
- **Authentication Routes**: Login, register, logout, profile
- **News Routes**: Get articles, search, filter
- **User Routes**: Preferences, saved articles, history
- **Creator Routes**: Convert content, schedule posting
- **Admin Routes**: Moderation, analytics

### 3. Database Schema (PostgreSQL)
- Users table with preferences
- Articles/Stories table with metadata
- Sources table with trust scores
- User interactions (likes, saves, shares)
- Trending topics tracking
- Creator content templates

### 4. AI/ML Services
- **Story Clustering**: Group similar news articles
- **Summarization**: Generate concise summaries
- **Recommendations**: Personalized article suggestions
- **Trend Detection**: Identify emerging topics
- **Content Generation**: Creator mode scripts

## Data Flow

1. **News Ingestion**:
   - External services fetch from various sources
   - Raw content stored temporarily
   - AI clustering identifies duplicates
   - Unified stories created

2. **Processing Pipeline**:
   - Story summarization
   - Source verification
   - Trust scoring
   - Trend calculation
   - Recommendation calculation

3. **User Delivery**:
   - Personalized feed generation
   - Real-time push notifications
   - Custom alerts
   - Search results

## Scalability Considerations

- Horizontal scaling with load balancing
- Database replication and sharding
- Caching layer for frequently accessed data
- Message queue for async processing
- CDN for static assets
- Rate limiting and circuit breakers

## Security

- JWT authentication
- Row-level security (RLS) with Supabase
- CORS configuration
- Rate limiting
- Input validation and sanitization
- HTTPS enforcement
- Environment variable management
