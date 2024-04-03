const subjectService = require('../services/subjectService');

async function getAllSubjects(req, res) {
  const subjects = await subjectService.getAllSubjects();
  res.json(subjects);
}

async function updateSubject(req, res) {
  const subjectData = req.body;
  try {
    const updatedPulpit = await subjectService.updateSubject(subjectData);
    res.status(200).json(updatedPulpit);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении предмета' });
  }
}

async function deleteSubject(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deletedSubject = await subjectService.deleteSubject(id);
    res.json(deletedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении предмета' });
  }
}

async function addSubject(req, res) {
  try {
    const subject = await subjectService.addSubject(req.body);
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAllSubjects,
  updateSubject,
  deleteSubject,
  addSubject
};
