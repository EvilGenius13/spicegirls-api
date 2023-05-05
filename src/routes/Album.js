const express = require('express');
const router = express.Router();
const albumController = require('../controllers/Album');
const apiKeyAuth = require('../middleware/checkAPI');
const trackRouteVisit = require('../middleware/RouteVisit');

router.use(trackRouteVisit);
router.get('/', albumController.getAll);
router.get('/:id', albumController.getOne);
router.post('/', apiKeyAuth, albumController.create);
router.put('/:id', apiKeyAuth, albumController.update);
router.delete('/:id', apiKeyAuth, albumController.delete);

module.exports = router;