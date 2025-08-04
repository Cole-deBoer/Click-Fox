import express from 'express';
import { createUser, getUserByUsername } from '../controllers/userController.js';
import {verifyToken} from '../middleware/authMiddleware.js' 

const router = express.Router();

router.post('/user/create', createUser);

router.get('/user/:username', getUserByUsername);


export default router;