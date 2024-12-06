import express from 'express';
import userClerkRoutes from './userClerkRoute';
import webhookClerkRoutes from './webhookClerkRoute';
import dashboardRoutes from './dashboardRoute';
import { authMiddleware } from '../middleware/clerkMiddleware';

const router = express.Router();

// Public routes
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to API v1',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

router.use('/webhook', webhookClerkRoutes);

// Protected routes
router.use('/users/clerk', authMiddleware, userClerkRoutes);
router.use('/dashboard', authMiddleware, dashboardRoutes);

export default router; 