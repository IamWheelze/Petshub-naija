import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// Messaging routes will be implemented here
// POST /api/messages/conversations - Create conversation
// GET /api/messages/conversations - Get user's conversations
// GET /api/messages/conversations/:id - Get conversation messages
// POST /api/messages/conversations/:id/messages - Send a message

router.get('/conversations', authenticate, (_req, res) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
});

export default router;
