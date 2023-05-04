const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const requireAuth = require('../middleware/requireAuth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/dashboard', requireAuth, userController.dashboard);

module.exports = router;