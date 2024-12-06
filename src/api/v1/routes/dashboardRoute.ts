import express from 'express';
import { getAdminDashboard, getUserDashboard } from '../controllers/dashboardController';
import { isAdmin, isUser } from '../middleware/roleMiddleware';

const router = express.Router();

// Admin dashboard route - requires admin role
router.get('/admin', isAdmin, getAdminDashboard);

// User dashboard route - requires authenticated user
router.get('/user', isUser, getUserDashboard);

export default router; 