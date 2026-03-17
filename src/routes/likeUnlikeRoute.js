import express from 'express';
import { toggleLike } from '../controllers/likeUnlikeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// like/unlike route
router.post('/posts/:postId/like', protect, toggleLike);

export default router;
