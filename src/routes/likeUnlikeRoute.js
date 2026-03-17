import express from 'express';
import { toggleLike } from '../controllers/likeUnlikeController.js';

const router = express.Router();

// like/unlike route
router.post('/posts/:postId/like', toggleLike);

export default router;