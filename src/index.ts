import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { requireAuth } from '@clerk/express';
/* ROUTE IMPORTS */
import v1Routes from './api/v1/routes';
import {
  notFoundHandler,
  errorHandler,
} from './api/v1/middleware/errorHandlerMiddleware';
import { loggingMiddleware } from './middleware/loggingMiddleware';

dotenv.config();

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggingMiddleware);

// Initialize Clerk with your secret key
if (!process.env.CLERK_SECRET_KEY) {
  throw new Error('Missing CLERK_SECRET_KEY');
}


/* API VERSIONS */
app.use('/api/v1', v1Routes);


// Keep existing error handlers
app.use('*', notFoundHandler);
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;
