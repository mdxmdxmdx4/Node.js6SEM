const facultyService = require('../services/facultyService');

async function getAllFaculties(req, res) {
  const faculties = await facultyService.getAllFaculties();
  res.json(faculties);
}

async function getFacultyWithSubjects(req, res) {
  const facultyCode = req.params.faculty;
  const faculty = await facultyService.getFacultyWithSubjects(facultyCode);
  res.json(faculty);
}

async function addFacultyWithPulpits(req, res) {
  try {
    const faculty = await facultyService.addFacultyWithPulpits(req.body);
    res.status(201).json(faculty);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateFaculty(req, res) {
  const facultyData = req.body;
  try {
    const updatedFaculty = await facultyService.updateFaculty(facultyData);
    res.status(200).json(updatedFaculty);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении факультета' });
  }
}

async function deleteFaculty(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deletedFaculty = await facultyService.deleteFaculty(id);
    res.json(deletedFaculty);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении факультета' });
  }
}

module.exports = {
  getAllFaculties,
  getFacultyWithSubjects,
  addFacultyWithPulpits,
  updateFaculty,
  deleteFaculty
};