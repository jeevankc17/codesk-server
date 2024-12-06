import express from 'express';
import { getUser } from '../controllers/userClerkController';

const router = express.Router();

router.get('/:userId', getUser);

export default router; 