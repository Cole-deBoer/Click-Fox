import express from 'express';
import {verifyToken} from '../middleware/authMiddleware.js'
import { results } from '../controllers/resultsController.js';

const router = express.Router();

router.post('/results', verifyToken, results);

export default router;