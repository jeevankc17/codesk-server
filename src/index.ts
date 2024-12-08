import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

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
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
app.use('/api/v1', ClerkExpressRequireAuth(), v1Routes);

// Error handling (must be after routes)
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
