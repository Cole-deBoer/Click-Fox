const express = require('express');
const { createUser, getUser, deleteUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const connectClient = require('../middleware/databaseMiddleware');

const router = express.Router();

router.post('/user/create', connectClient, createUser);

router.get('/user/:uid', connectClient, getUser);

router.delete('/user/:uid', connectClient, verifyToken, deleteUser);

module.exports = router;