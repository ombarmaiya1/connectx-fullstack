# Connect X Backend

Production-ready Django backend for the Connect X platform.

## ⚙️ Tech Stack

- **Framework:** Django 4.2
- **API:** Django REST Framework
- **Auth:** JWT (SimpleJWT)
- **Database:** PostgreSQL
- **Realtime:** Django Channels (WebSockets) w/ Redis
- **Deployment:** Render

## 🚀 Local Setup

1. **Create Virtual Environment**
   ```bash
   python -m venv venv
   # Windows
   ./venv/Scripts/activate
   # Linux/Mac
   source venv/bin/activate
   ```

2. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Setup**
   Copy `.env.example` to `.env` and configure your database and secret key.
   ```bash
   cp .env.example .env
   ```
   
   Make sure to create a PostgreSQL database named `connectx_db`.

4. **Run Migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run Development Server**
   ```bash
   python manage.py runserver
   ```
   
   For WebSocket support (dev):
   ```bash
   daphne -p 8000 connectx_backend.asgi:application
   ```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (get tokens)
- `POST /api/auth/refresh` - Refresh access token

### Profiles
- `GET /api/profile/me` - Get current user profile
- `PUT /api/profile/update` - Update profile
- `GET /api/profile/<id>` - Get specific profile

### Matching
- `POST /api/match/` - Find matches based on skills/college/year

### Connections
- `POST /api/connect/request` - Send connection request
- `POST /api/connect/accept` - Accept request
- `POST /api/connect/reject` - Reject request
- `GET /api/connect/requests` - List all requests (sent, received, accepted)

### Chat
- `POST /api/chat/room/create` - Start chat with connected user
- `GET /api/chat/rooms` - List chat rooms
- `GET /api/chat/room/<id>/messages` - Get message history
- `WS /ws/chat/<room_id>/` - Real-time messaging

## 📦 Deployment

This project is configured for deployment on Render.
The `build.sh` script handles installation and migrations.
The `Procfile` runs the Daphne ASGI server.
