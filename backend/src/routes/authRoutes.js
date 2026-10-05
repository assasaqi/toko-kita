const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Endpoint API untuk login
router.post('/login', login);

module.exports = router;
