import { Router } from 'express';
import { builderController } from '../controllers/builderController';

const router = Router();

// Add error handling wrapper
const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

router.post("/create", builderController.createBuilder);


export default router; 