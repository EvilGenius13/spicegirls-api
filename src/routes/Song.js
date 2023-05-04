const express = require('express');
const router = express.Router();
const apiKeyAuth = require('../middleware/checkAPI');

const songController = require('../controllers/Song');

router.get('/', songController.getAll);
router.get('/:id', songController.getOne);
router.post('/', apiKeyAuth, songController.create);
router.put('/:id', apiKeyAuth, songController.update);
router.delete('/:id', apiKeyAuth, songController.delete);

module.exports = router;