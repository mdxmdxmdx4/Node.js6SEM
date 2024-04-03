const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.get('/teachers', teacherController.getAllTeachers);
router.get('/pulpitsWithVladimir', teacherController.getPulpitsWithVladimir);
router.put('/teachers', teacherController.updateTeacher);
router.delete('/teachers/:id', teacherController.deleteTeacher);
router.post('/teachers', teacherController.addTeacher);

module.exports = router;