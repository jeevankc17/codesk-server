export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
} 

// Add this to your existing types
declare global {
  namespace Express {
    interface Request {
      webhookEvent: any;
    }
  }
} 