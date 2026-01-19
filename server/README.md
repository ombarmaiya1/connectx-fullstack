# Connect X Backend - Quick Start Guide

## Prerequisites
You need MongoDB installed. Choose one option:

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `.env` file with connection string

### Option 2: Local MongoDB
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Use `mongodb://localhost:27017/connectx` (already in .env)

## Starting the Backend

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

## Testing the API

### 1. Test Server is Running
Visit: `http://localhost:5000/`

### 2. Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com", "password": "password123"}'
```

### 3. Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

## API Endpoints

All endpoints are prefixed with `/api`

**Auth:**
- POST `/auth/signup` - Register
- POST `/auth/login` - Login
- GET `/auth/me` - Get current user (protected)

**Posts:**
- GET `/posts` - Get all posts
- POST `/posts` - Create post (protected)
- GET `/posts/:id` - Get single post
- POST `/posts/:id/like` - Like/unlike post (protected)
- POST `/posts/:id/comment` - Add comment (protected)
- DELETE `/posts/:id` - Delete post (protected)

**Users:**
- GET `/users/:id` - Get user profile
- PUT `/users/profile` - Update profile (protected)
- GET `/users/search?query=...` - Search users
- GET `/users/suggested` - Get suggested users (protected)

**Opportunities:**
- GET `/opportunities` - Get all opportunities
- POST `/opportunities` - Create opportunity (protected)
- GET `/opportunities/:id` - Get single opportunity
- POST `/opportunities/:id/apply` - Apply (protected)

**Messages:**
- GET `/messages/conversations` - Get all chats (protected)
- GET `/messages/:userId` - Get messages with user (protected)
- POST `/messages` - Send message (protected)

**Connections:**
- GET `/connections` - Get connections (protected)
- GET `/connections/requests` - Get pending requests (protected)
- POST `/connections/request` - Send request (protected)
- PUT `/connections/accept/:id` - Accept request (protected)
- DELETE `/connections/:userId` - Remove connection (protected)

## Notes
- All protected routes need `Authorization: Bearer <token>` header
- Tokens are returned on signup/login
