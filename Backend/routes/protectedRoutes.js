const express = require('express');
const { requireAuth } = require('@clerk/clerk-sdk-node');
const { getUser } = require('../controllers/userController');

const router = express.Router();

router.get('/protected', requireAuth(), getUser);

module.exports = router;
