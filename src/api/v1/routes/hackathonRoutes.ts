import { Router } from 'express';
import { HackathonController } from '../controllers/hackathonController';

const router = Router();
const hackathonController = new HackathonController();

// Routes will be added here
export default router; 