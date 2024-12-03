import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware, clerkClient, requireAuth } from '@clerk/express';

/* ROUTE IMPORTS */
import userClerkRoutes from './routes/userClerkRoute';
import {
  notFoundHandler,
  errorHandler,
} from './middleware/errorHandlerMiddleware';

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
  });
});

/* ROUTES */
app.use('/users/clerk', userClerkRoutes);

// Error handling (must be after routes)
app.use('*', notFoundHandler);
app.use(errorHandler);

/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
