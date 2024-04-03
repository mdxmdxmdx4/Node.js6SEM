const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.get('/subjects', subjectController.getAllSubjects);
router.put('/subjects', subjectController.updateSubject);
router.delete('/subjects/:id', subjectController.deleteSubject);
router.post('/subjects', subjectController.addSubject);

module.exports = router;