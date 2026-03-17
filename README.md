# Blog-Platform
A simple REST API for a blogging platform built with Express and MongoDB.

**Status:** Auth, post CRUD, comments, and likes are wired up.

## Features
- User registration and login with JWT
- Create, read, update, delete blog posts (protected)
- User roles included in the token (`user`, `admin`)

## Tech Stack
- Node.js, Express
- MongoDB + Mongoose
- JWT authentication

## Getting Started
1. Install dependencies
```bash
npm install
```

2. Create a `.env` file in the project root
```env
PORT=5100
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

3. Run the server
```bash
npm run dev
```

The API will be available at `http://localhost:5100` (or your chosen `PORT`).

## API Routes
Base URL: `/api/v1`

### Auth
- `POST /auth/register`  
Body:
```json
{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "email": "ada@example.com",
  "password": "password123"
}
```

- `POST /auth/login`  
Body:
```json
{
  "email": "ada@example.com",
  "password": "password123"
}
```

### Posts (protected)
All post routes require the `Authorization` header:
```
Authorization: Bearer <token>
```

- `GET /posts`
- `GET /posts/:id`
- `POST /posts`  
Body:
```json
{
  "title": "My First Post",
  "content": "Hello, world!"
}
```
- `PUT /posts/:id`
- `DELETE /posts/:id`

### Comments
- `POST /comments` (protected)  
Body:
```json
{
  "content": "Nice post!",
  "postId": "<postId>"
}
```
- `GET /posts/:postId/comments`
- `PUT /comments/:id` (protected)
- `DELETE /comments/:id` (protected)

### Likes
- `POST /posts/:postId/like` (protected)

## Notes
- Comment and like routes are mounted in `server.js`.
