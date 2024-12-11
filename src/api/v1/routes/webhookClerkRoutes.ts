import express from 'express';
import { handleClerkWebhook } from '../controllers/webhookClerkController';
import { verifyClerkWebhookSignature } from '../middleware/webhookClerkMiddleware';

const router = express.Router();

router.post('/clerk', verifyClerkWebhookSignature, handleClerkWebhook);

export default router; 