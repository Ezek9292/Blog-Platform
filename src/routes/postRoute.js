import express from "express";
import { createPost, getPostById, updatePost, deletePost, getPosts } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// post routes
router.get('/posts', protect, getPosts);
router.get('/posts/:id', protect, getPostById);


router.post('/posts', protect, createPost);
router.put('/posts/:id', protect, updatePost);
router.delete('/posts/:id', protect, deletePost);

export default router;