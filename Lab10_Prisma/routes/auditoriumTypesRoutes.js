const express = require('express');
const router = express.Router();
const auditoriumTypeController = require('../controllers/auditoriumTypeController');

router.get('/auditoriumtypes', auditoriumTypeController.getAllAuditoriumTypes);
router.get('/auditoriumtypes/:type/auditoriums', auditoriumTypeController.getAuditoriumsByType);
router.put('/auditoriumtypes', auditoriumTypeController.updateAuditoriumType);
router.delete('/auditoriumtypes/:id', auditoriumTypeController.deleteAuditoriumType);
router.post('/auditoriumtypes', auditoriumTypeController.addAuditoriumType);

module.exports = router;