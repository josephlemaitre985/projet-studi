const express = require('express');
const router = express.Router();
const openingHoursController = require('../controllers/openingHoursController');

router.get('/', openingHoursController.getAll);
router.get('/:day', openingHoursController.getByDay);
router.post('/', openingHoursController.create.bind(openingHoursController));
router.put('/:day', openingHoursController.update);
router.delete('/:day', openingHoursController.delete);

module.exports = router;
