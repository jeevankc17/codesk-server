import { Router } from 'express';
import { BuilderController } from '../controllers/builderController';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const router = Router();
const builderController = new BuilderController();

// Create builder profile with Clerk authentication
router.post('/create', ClerkExpressRequireAuth(), builderController.createBuilder);

export default router; 