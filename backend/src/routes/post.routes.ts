import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// Social post routes will be implemented here
// POST /api/posts - Create a post
// GET /api/posts - Get feed
// GET /api/posts/:id - Get post details
// PUT /api/posts/:id - Update post
// DELETE /api/posts/:id - Delete post
// POST /api/posts/:id/like - Like a post
// POST /api/posts/:id/comment - Comment on a post

router.get('/', authenticate, (req, res) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
});

export default router;
