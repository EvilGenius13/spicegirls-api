const express = require('express');
const router = express.Router();
const bandMemberController = require('../controllers/BandMember');
const apiKeyAuth = require('../middleware/checkAPI');

router.get('/', bandMemberController.getAll);
router.get('/:id', bandMemberController.getOne);
router.post('/', apiKeyAuth, bandMemberController.create);
router.put('/:id', apiKeyAuth, bandMemberController.update);
router.delete('/:id', apiKeyAuth, bandMemberController.delete);

module.exports = router;