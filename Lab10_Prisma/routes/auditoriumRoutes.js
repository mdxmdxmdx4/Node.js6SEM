const express = require('express');
const router = express.Router();
const auditoriumController = require('../controllers/auditoriumController');

router.get('/auditoriums', auditoriumController.getAllAuditoriums);
router.get('/auditoriumsWithComp1', auditoriumController.getComputerAuditoriumsB1);
router.get('/auditoriumsSameCount', auditoriumController.getAuditoriumsSameCount);
router.put('/auditoriums', auditoriumController.updateAuditorium);
router.delete('/auditoriums/:id', auditoriumController.deleteAuditorium);
router.post('/auditoriums', auditoriumController.addAuditorium);
router.get('/fluent', auditoriumController.getSpecificAuditoriums);
router.get('/tran', auditoriumController.incrementCapacity);

module.exports = router;