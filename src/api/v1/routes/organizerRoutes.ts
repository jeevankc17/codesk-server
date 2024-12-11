import { Router } from 'express';
import { OrganizerController } from '../controllers/organizerController';

const router = Router();
const organizerController = new OrganizerController();

// Routes will be added here
export default router; 