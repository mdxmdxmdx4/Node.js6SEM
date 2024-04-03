const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/faculties', facultyController.getAllFaculties);
router.get('/faculties/:faculty/subjects', facultyController.getFacultyWithSubjects);
router.post('/faculties', facultyController.addFacultyWithPulpits);
router.put('/faculties', facultyController.updateFaculty);
router.delete('/faculties/:id', facultyController.deleteFaculty);

module.exports = router;