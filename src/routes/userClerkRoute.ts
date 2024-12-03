import express from 'express';
import { getUser, updateUser } from '../controllers/userClerkController';

const router = express.Router();

router.get('/', getUser);
router.put('/', updateUser);

export default router;
