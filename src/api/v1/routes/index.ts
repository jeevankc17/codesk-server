import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { requireAuth } from '@clerk/express';
import { checkUserRole } from '../middleware/roleMiddleware';
import userClerkRoutes from './userClerkRoutes';
import webhookClerkRoutes from './webhookClerkRoutes';
import hackathonRoutes from './hackathonRoutes'; 
import builderRoutes from './builderRoutes';
import projectRoutes from './projectRoutes';
import organizerRoutes from './organizerRoutes'; 

const router = Router();


// Logging middleware
router.use((req, res, next) => {
  console.log('\n=== Request Details ===');
  console.log({
    method: req.method,
    path: req.path,
    baseUrl: req.baseUrl,
    originalUrl: req.originalUrl,
    headers: req.headers
  });
  next();
});

// Public routes
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to API v1',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Webhook routes (public)
router.use('/webhook', webhookClerkRoutes);

// Protected routes with Clerk auth
const clerkAuth = requireAuth({
  debug: process.env.NODE_ENV !== 'production'
});

// Add error handling middleware after Clerk auth
router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err?.statusCode === 401) {
    res.status(401).json({
      error: 'Authentication required'
    });
  }
  next(err);
});

// Apply auth and role middleware to protected routes with debugging
router.use('/builders', 
  clerkAuth,
  checkUserRole, 
  builderRoutes
);
router.use('/projects', clerkAuth, checkUserRole, projectRoutes);
router.use('/hackathons', clerkAuth, checkUserRole, hackathonRoutes);
router.use('/organizers', clerkAuth, checkUserRole, organizerRoutes);
router.use('/users/clerk', clerkAuth, checkUserRole, userClerkRoutes);

export default router; 