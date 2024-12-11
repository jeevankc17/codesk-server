import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/express';
import { APIResponse } from '../../../types';

// Extend the auth property from Clerk
declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
        sessionId: string;
        role?: string;
      };
    }
  }
}

export const checkUserRole = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log('\n=== Role Middleware ===');
  console.log('Checking role for user:', req.auth?.userId);
  
  try {
    if (!req.auth?.userId) {
      console.log('No auth.userId found');
      const response: APIResponse = {
        success: false,
        error: 'Authentication required',
        timestamp: new Date().toISOString(),
      };
      res.status(401).json(response);
      return;
    }

    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);
    console.log('User found:', user.id);
    const role = user.publicMetadata.role as string;
    
    req.auth.role = role;
    console.log('Role attached:', role);
    next();
  } catch (error) {
    console.error('Role middleware error:', error);
    const response: APIResponse = {
      success: false,
      error: 'Error fetching user role',
      timestamp: new Date().toISOString(),
    };
    res.status(500).json(response);
  }
};



