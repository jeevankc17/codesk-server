import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';

/* ROUTE IMPORTS */
import v1Routes from './api/v1/routes';
import {
  notFoundHandler,
  errorHandler,
} from './api/v1/middleware/errorHandlerMiddleware';

dotenv.config();

/* CONFIGURATIONS */
const app = express();
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Add a root route handler
app.get('/', (req, res) => {
  res.json({
    message: 'Codesk API is running',
    status: 'ok',
    timestamp: new Date().toISOString(),
    versions: {
      v1: '/api/v1',
    },
  });
});

/* API VERSIONS */
app.use('/api/v1', v1Routes);

// Error handling (must be after routes)
app.use('*', notFoundHandler);
app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export for Vercel
export default app;
