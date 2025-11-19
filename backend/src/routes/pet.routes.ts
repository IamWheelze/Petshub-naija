import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// Pet routes will be implemented here
// POST /api/pets - Create a pet
// GET /api/pets/:id - Get pet details
// PUT /api/pets/:id - Update pet
// DELETE /api/pets/:id - Delete pet
// POST /api/pets/:id/follow - Follow a pet

router.get('/', authenticate, (_req, res) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
});

export default router;
