# Blog-Platform
A simple REST API for a blogging platform built with Express and MongoDB.

**Status:** Auth and post CRUD routes are wired up. Comment and like routes exist in `src/routes`, but they are not mounted in `server.js` yet.

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

## Notes
- If you want comment and like routes, mount `src/routes/commentRoute.js` and `src/routes/likeUnlikeRoute.js` in `server.js`.
