import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Temporary bypass for testing
  req.user = { id: 'test-user-id' };
  next();
  
  // Comment out the actual auth logic for now
  /*
  try {
    const sessionToken = req.headers.authorization?.split(' ')[1];
    
    if (!sessionToken) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const session = await clerkClient.sessions.verifySession(
      sessionToken,
      process.env.CLERK_SECRET_KEY as string
    );
    req.user = { id: session.userId };
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
  */
}; 