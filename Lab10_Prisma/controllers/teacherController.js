const teacherService = require('../services/teacherService');

async function getAllTeachers(req, res) {
  const teachers = await teacherService.getAllTeachers();
  res.json(teachers);
}

async function getPulpitsWithVladimir(req, res) {
  try {
    const pulpits = await teacherService.getPulpitsWithVladimir();
    res.json(pulpits);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении кафедр с преподавателем Владимир' });
  }
}

async function updateTeacher(req, res) {
  const teacherData = req.body;
  try {
    const updatedPulpit = await teacherService.updateTeacher(teacherData);
    res.status(200).json(updatedPulpit);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении преподавателя' });
  }
}

async function deleteTeacher(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deletedTeacher = await teacherService.deleteTeacher(id);
    res.json(deletedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении преподавателя' });
  }
}

async function addTeacher(req, res) {
  try {
    const teacher = await teacherService.addTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


module.exports = {
  getAllTeachers,
  getPulpitsWithVladimir,
  updateTeacher,
  deleteTeacher,
  addTeacher
};