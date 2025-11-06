import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { rateLimiter } from './middleware/rateLimiter';
import { logger } from './utils/logger';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import petRoutes from './routes/pet.routes';
import postRoutes from './routes/post.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import listingRoutes from './routes/listing.routes';
import breedingRoutes from './routes/breeding.routes';
import messageRoutes from './routes/message.routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const httpServer = createServer(app);

// Socket.IO for real-time features
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  },
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate limiting
app.use('/api/', rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'PetHub Nigeria API is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/breeding', breedingRoutes);
app.use('/api/messages', messageRoutes);

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('join_conversation', (conversationId: string) => {
    socket.join(conversationId);
    logger.info(`User ${socket.id} joined conversation ${conversationId}`);
  });

  socket.on('leave_conversation', (conversationId: string) => {
    socket.leave(conversationId);
    logger.info(`User ${socket.id} left conversation ${conversationId}`);
  });

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Make io accessible to routes
app.set('io', io);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
  logger.info(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔗 API URL: http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

export { app, io };
