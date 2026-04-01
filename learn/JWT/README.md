POST /register   → save user with hashed password
POST /login      → verify password, return JWT
GET  /me         → protected route, return user info