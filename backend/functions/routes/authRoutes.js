const express = require('express');
const ping = require('../controllers/authController') 

const router = express.Router();

router.get('/auth/ping', ping);


module.exports = router;