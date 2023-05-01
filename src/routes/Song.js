const express = require('express');
const router = express.Router();

const songController = require('../controllers/Song');

router.get('/', songController.getAll);
router.get('/:id', songController.getOne);
router.post('/', songController.create);
router.put('/:id', songController.update);
router.delete('/:id', songController.delete);

module.exports = router;