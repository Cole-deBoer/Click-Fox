import express from 'express';
import {ping} from '../controllers/authController.js' 
import {verifyToken} from '../middleware/authMiddleware.js' 

const router = express.Router();

router.get('/auth/ping', verifyToken, ping);


export default router;