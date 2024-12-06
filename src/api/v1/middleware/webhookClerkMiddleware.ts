import { Request, Response, NextFunction } from 'express';
import { Webhook } from 'svix';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

export const verifyClerkWebhookSignature = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log('🔍 Webhook Request Received');
  console.log('Environment variables loaded:', {
    hasWebhookSecret: !!process.env.CLERK_WEBHOOK_SECRET,
    nodeEnv: process.env.NODE_ENV
  });

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error('❌ Missing CLERK_WEBHOOK_SECRET. Available env vars:', Object.keys(process.env));
    res.status(500).json({ error: 'Clerk webhook secret not configured' });
    return;
  }

  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing Svix headers:', {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
    res.status(400).json({ error: 'Missing svix headers' });
    return;
  }

  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    const payload = JSON.stringify(req.body);
    console.log('Webhook payload:', payload);
    
    req.webhookEvent = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
    console.log('Webhook verification successful');
    next();
  } catch (err) {
    console.error('Webhook verification failed:', err);
    res.status(400).json({ error: 'Invalid webhook signature' });
    return;
  }
}; 