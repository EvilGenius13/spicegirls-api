const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const requireAuth = require('../middleware/requireAuth');
const trackRouteVisit = require('../middleware/RouteVisit');

router.use(trackRouteVisit);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/dashboard', requireAuth, userController.dashboard);
router.get('/metrics', requireAuth, userController.metrics);

module.exports = router;