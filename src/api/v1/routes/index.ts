import express from 'express';
import userClerkRoutes from './userClerkRoute';
import webhookClerkRoutes from './webhookClerkRoute';
import hackathonRoutes from './hackathonRoute'; 
import builderRoutes from './builderRoute';
import projectRoutes from './projectRoute';
import organizerRoutes from './organizerRoute'; 

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

// Protected routes - using Clerk's built-in auth
router.use('/builders', builderRoutes);  // Note: changed from /builder to /builders
router.use('/projects', projectRoutes);
router.use('/hackathons', hackathonRoutes);
router.use('/organizers', organizerRoutes);
router.use('/users/clerk', userClerkRoutes);

export default router; 