const express = require('express');
const router = express.Router();
const bandMemberController = require('../controllers/BandMember');

router.get('/', bandMemberController.getAll);
router.get('/:id', bandMemberController.getOne);
router.post('/', bandMemberController.create);
router.put('/:id', bandMemberController.update);
router.delete('/:id', bandMemberController.delete);

module.exports = router;