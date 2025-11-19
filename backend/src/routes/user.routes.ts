import { Router } from 'express';
// import { authenticate } from '../middleware/auth'; // TODO: Use when implementing routes

const router = Router();

// User profile routes will be implemented here
// GET /api/users/:id - Get user profile
// PUT /api/users/:id - Update user profile
// GET /api/users/:id/pets - Get user's pets
// GET /api/users/:id/posts - Get user's posts

router.get('/:id', (_req, res) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
});

export default router;
