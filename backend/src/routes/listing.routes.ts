import { Router } from 'express';
// import { authenticate } from '../middleware/auth'; // TODO: Use when implementing routes

const router = Router();

// Pet listing marketplace routes will be implemented here
// POST /api/listings - Create a pet listing
// GET /api/listings - Get all listings
// GET /api/listings/:id - Get listing details
// PUT /api/listings/:id - Update listing
// DELETE /api/listings/:id - Delete listing

router.get('/', (_req, res) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
});

export default router;
