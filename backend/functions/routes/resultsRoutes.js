const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const results = require('../controllers/resultsController');
const connectClient = require('../middleware/databaseMiddleware');

const router = express.Router();

router.post('/results', connectClient, verifyToken, results);

module.exports = router;