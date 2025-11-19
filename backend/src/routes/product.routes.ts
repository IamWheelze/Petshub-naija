import { Router } from 'express';
// import { authenticate } from '../middleware/auth'; // TODO: Use when implementing routes

const router = Router();

// E-commerce product routes will be implemented here
// GET /api/products - Get all products
// GET /api/products/:id - Get product details
// POST /api/products/:id/review - Add product review
// POST /api/cart - Add to cart
// GET /api/cart - Get cart items
// POST /api/wishlist - Add to wishlist

router.get('/', (_req, res) => {
  res.status(501).json({ status: 'error', message: 'Not implemented yet' });
});

export default router;
