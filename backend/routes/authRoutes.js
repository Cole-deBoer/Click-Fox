import express from 'express';
import {ping, stats} from '../controllers/authController.js' 
import {verifyToken} from '../middleware/authMiddleware.js' 

const router = express.Router();

router.get('/auth/ping', ping);

router.get('/auth/stats', verifyToken, stats);

export default router;