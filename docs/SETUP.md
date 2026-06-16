# PulseAI - Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Git

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/taysports048-beep/Pulseai.git
cd Pulseai
```

### 2. Install Root Dependencies

```bash
npm install
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

**Create `.env.local`:**

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Setup Backend

```bash
cd ../backend
npm install
```

**Create `.env`:**

```env
NODE_ENV=development
PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=http://localhost:3000
API_TIMEOUT=30000
MAX_REQUESTS_PER_MINUTE=100
```

### 5. Setup Supabase Database

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Run the SQL schema from `docs/DATABASE_SCHEMA.md` in the Supabase SQL editor
4. Copy your project URL and keys

## Running the Application

### Development Mode

```bash
# From root directory
npm run dev
```

This starts both frontend (port 3000) and backend (port 3001) concurrently.

### Build for Production

```bash
npm run build
```

### Start Production Servers

```bash
npm start
```

## API Endpoints

See `docs/API_ENDPOINTS.md` for complete API documentation.

## Features Implemented

### ✅ Authentication
- User registration and login
- JWT token management
- Protected routes
- Profile management

### ✅ News & Articles
- Personalized feed
- Trending articles
- Latest articles
- Search functionality
- Article timeline

### ✅ User Management
- User preferences
- Saved articles
- Interaction tracking
- Profile updates

### ✅ Creator Features
- Content generation (templates)
- Post scheduling
- Platform integration hooks
- Engagement tracking

### ✅ Alerts & Notifications
- Custom alerts
- Push notifications
- Email notifications
- Breaking news alerts

### ✅ Recommendations
- Personalized recommendations
- Similar articles
- Trending suggestions

### ✅ Search
- Full-text search
- Advanced filters
- Search suggestions

## Frontend Features

- Modern dark theme
- Responsive design (mobile-first)
- Animated components
- Real-time updates
- Toast notifications
- Global state management (Zustand)

## Backend Features

- Express.js REST API
- Supabase integration
- Error handling middleware
- Authentication middleware
- Rate limiting
- CORS configuration
- Request validation

## Project Structure

```
Pulseai/
├── frontend/
│   ├── src/
│   │   ├── app/          # Next.js pages
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilities & API
│   │   ├── styles/       # CSS/Tailwind
│   │   └── types/        # TypeScript types
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/       # Configuration
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── index.ts      # Main app
│   └── package.json
├── docs/                 # Documentation
└── package.json
```

## Next Steps

1. **Implement AI Services**
   - Story clustering
   - Text summarization
   - Recommendation algorithms

2. **Data Aggregation**
   - Web scrapers
   - RSS feed integration
   - Social media APIs

3. **Real-time Updates**
   - WebSocket connections
   - Live notifications
   - Real-time trending

4. **Analytics**
   - User engagement tracking
   - Content performance
   - Trending algorithms

5. **Deployment**
   - Docker containerization
   - CI/CD pipeline
   - Production environment

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Supabase Connection Issues

- Verify credentials in `.env` files
- Check Supabase project status
- Ensure database schema is set up

### CORS Issues

- Check `FRONTEND_URL` in backend `.env`
- Verify frontend URL matches CORS origin

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## License

MIT License - See LICENSE file for details
