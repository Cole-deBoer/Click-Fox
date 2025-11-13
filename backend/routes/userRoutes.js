import express from 'express';
import { createUser, getUser, deleteUser } from '../controllers/userController.js';
import {verifyToken} from '../middleware/authMiddleware.js' 

const router = express.Router();

router.post('/user/create', createUser);

router.get('/user/:uid', getUser);

router.delete('/user/:uid', verifyToken, deleteUser);

export default router;