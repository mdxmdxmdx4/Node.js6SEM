const express = require('express');
const router = express.Router();
const pulpitController = require('../controllers/pulpitController');

router.get('/pulpits', pulpitController.getAllPulpits);
router.get('/puplitsWithoutTeachers', pulpitController.getPulpitsWithoutTeachers);
router.put('/pulpits', pulpitController.updatePulpit);
router.delete('/pulpits/:id', pulpitController.deletePulpit);
router.post('/pulpits', pulpitController.addPulpitWithFaculty);
router.get('/pulpitsWithTeachersCount', pulpitController.getPulpitsWithTeachersCount);
router.get('/pulpits/count', pulpitController.getPulpitsCount);
router.get('/pulpits/html', pulpitController.getPulpitsPageHTML);

module.exports = router;