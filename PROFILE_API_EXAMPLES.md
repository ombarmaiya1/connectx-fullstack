# Profile Page API Response Examples

## GET /api/auth/me (JWT Token Required)

### Request:
```http
GET http://localhost:8000/api/auth/me
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbG...
```

### Response (200 OK):
```json
{
    "id": 1,
    "email": "john.doe@example.com",
    "name": "John Doe",
    "headline": "Full Stack Developer at Google",
    "bio": "Passionate about building scalable web applications. Love React and Django!",
    "avatar": "https://example.com/avatar.jpg",
    "location": "San Francisco, CA",
    "college": "MIT",
    "skills": [
        "React",
        "Django",
        "Python",
        "JavaScript",
        "PostgreSQL"
    ],
    "connections": [2, 3, 5, 7],
    "followers": [2, 3],  
    "following": [5, 7],
    "createdAt": "2026-01-15T10:30:00.000Z"
}
```

---

## GET /api/profile/me (JWT Token Required)

### Request:
```http
GET http://localhost:8000/api/profile/me
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbG...
```

### Response (200 OK):
```json
{
    "success": true,
    "data": {
        "id": 1,
        "email": "john.doe@example.com",
        "name": "John Doe",
        "headline": "Full Stack Developer at Google",
        "bio": "Passionate about building scalable web applications.",
        "avatar": "https://example.com/avatar.jpg",
        "location": "San Francisco, CA",
        "college": "MIT",
        "skills": ["React", "Django", "Python"],
        "connections": [2, 3, 5, 7],
        "followers": [2, 3],
        "following": [5, 7],
        "createdAt": "2026-01-15T10:30:00.000Z"
    }
}
```

---

## PATCH /api/users/profile/ (JWT Token Required)

### Request:
```http
PATCH http://localhost:8000/api/users/profile/
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbG...
Content-Type: application/json

{
    "name": "Jane Smith",
    "headline": "Senior Software Engineer",
    "bio": "Building the future of web development",
    "location": "New York, NY",
    "college": "Stanford University",
    "skills": ["React", "TypeScript", "Node.js", "GraphQL"],
    "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

### Response (200 OK):
```json
{
    "success": true,
    "data": {
        "id": 1,
        "email": "john.doe@example.com",
        "name": "Jane Smith",
        "headline": "Senior Software Engineer",
        "bio": "Building the future of web development",
        "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
        "location": "New York, NY",
        "college": "Stanford University",
        "skills": ["React", "TypeScript", "Node.js", "GraphQL"],
        "connections": [2, 3, 5, 7],
        "followers": [2, 3],
        "following": [5, 7],
        "createdAt": "2026-01-15T10:30:00.000Z"
    }
}
```

### Response (400 Bad Request):
```json
{
    "success": false,
    "errors": {
        "headline": ["This field cannot be longer than 255 characters."]
    }
}
```

---

## Error Responses

### 401 Unauthorized (No Token):
```json
{
    "detail": "Authentication credentials were not provided."
}
```

### 401 Unauthorized (Invalid Token):
```json
{
    "detail": "Given token not valid for any token type",
    "code": "token_not_valid",
    "messages": [
        {
            "token_class": "AccessToken",
            "token_type": "access",
            "message": "Token is invalid or expired"
        }
    ]
}
```

### 500 Internal Server Error:
```json
{
    "success": false,
    "message": "Error fetching profile: <error details>"
}
```

---

## Field Notes

### **connections, followers, following:**
- Returns **arrays of user IDs**, not user objects
- Frontend displays `.length` for count
- Empty array `[]` if no connections

### **skills:**
- Array of strings
- Can be empty array `[]`
- Frontend joins with commas for editing

### **createdAt:**
- ISO 8601 format timestamp
- Maps from Django's `date_joined` field

### **name:**
- Computed from `first_name` + `last_name`
- Falls back to email username if both empty
- Frontend can send as single string (backend splits)

### **avatar:**
- Can be URL or base64-encoded image
- Stored as TextField (supports long base64 strings)
- Empty string `""` if not set

---

## Frontend Profile.jsx Mapping

```javascript
// Frontend reads from user object:
user.name          → backend: computed property
user.email         → backend: user.email
user.headline      → backend: profile.headline
user.bio           → backend: profile.bio
user.avatar        → backend: profile.avatar
user.location      → backend: profile.location
user.college       → backend: profile.college
user.skills        → backend: profile.skills (array)
user.connections   → backend: computed from ConnectionRequest
user.followers     → backend: computed from ConnectionRequest
user.following     → backend: computed from ConnectionRequest
user.createdAt     → backend: user.date_joined

// Display Logic:
user.connections?.length || 0   // Count of connections
user.followers?.length || 0     // Count of followers
user.following?.length || 0     // Count of following
displaySkills.length            // Count of skills
```

---

## Testing with cURL

### Get Profile:
```bash
curl -X GET http://localhost:8000/api/profile/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Update Profile:
```bash
curl -X PATCH http://localhost:8000/api/users/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "headline": "Software Developer",
    "location": "San Francisco"
  }'
```

---

## Production URLs

Replace `http://localhost:8000` with your Render backend URL:
- **Development:** `http://localhost:8000`
- **Production:** `https://connectx-backend.onrender.com`
