import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

// Define public routes that don't require authentication
const publicRoutes = ['/', '/api/v1/webhook', '/sign-in', '/sign-up'];

// Extend Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { path } = req;
  const authHeader = req.headers.authorization;

  if (publicRoutes.includes(path)) {
    next();
    return;
  }

  if (!authHeader) {
    res.status(401).json({
      success: false,
      error: 'Authentication required',
      timestamp: new Date().toISOString(),
    });
    return;
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const session = await clerkClient.sessions.verifySession(token, token);

    if (!session || !session.userId) {
      res.status(401).json({
        success: false,
        error: 'Invalid session',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Fetch user details
    const user = await clerkClient.users.getUser(session.userId);
    const role = user.publicMetadata.role as string;

    // Attach user info to the request object
    req.user = { id: user.id, role };

    // Role-based access control
    if (role === 'admin' && path === '/dashboard') {
      res.redirect('/admin/dashboard');
      return;
    }

    if (role !== 'admin' && path.startsWith('/admin')) {
      res.status(403).json({
        success: false,
        error: 'Access denied',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Prevent authenticated users from accessing public routes
    if (publicRoutes.includes(path)) {
      res.redirect(role === 'admin' ? '/admin/dashboard' : '/dashboard');
    }

    next();
  } catch (error) {
    console.error('Error verifying Clerk session or fetching user data:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication error',
      timestamp: new Date().toISOString(),
    });
    return;
  }
}; 