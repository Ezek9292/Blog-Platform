import express from 'express';
import { createComment, getCommentsByPostId, deleteComment, updateComment} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// comment routes   
router.post('/comments', protect, createComment);
router.get('/posts/:postId/comments', getCommentsByPostId);
router.put('/comments/:id', protect, updateComment);
router.delete('/comments/:id', protect, deleteComment);

export default router;