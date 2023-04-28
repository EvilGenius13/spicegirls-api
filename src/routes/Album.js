const express = require('express');
const router = express.Router();
const albumController = require('../controllers/Album');

router.get('/', albumController.getAll);
router.get('/:id', albumController.getOne);
router.post('/', albumController.create);
router.put('/:id', albumController.update);
router.delete('/:id', albumController.delete);

module.exports = router;