const pulpitService = require('../services/pulpitService');
const path = require('path');

async function getAllPulpits(req, res) {
  const pulpits = await pulpitService.getAllPulpits();
  res.json(pulpits);
}

async function getPulpitsWithoutTeachers(req, res) {
  const pulpits = await pulpitService.getPulpitsWithoutTeachers();
  res.json(pulpits);
}

async function updatePulpit(req, res) {
  const facultyData = req.body;
  try {
    const updatedPulpit = await pulpitService.updatePulpit(facultyData);
    res.status(200).json(updatedPulpit);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении кафедры' });
  }
}

async function deletePulpit(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deletedPulpit = await pulpitService.deletePulpit(id);
    res.json(deletedPulpit);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении кафедры' });
  }
}

async function addPulpitWithFaculty(req, res) {
  try {
    const pulpit = await pulpitService.addPulpitWithFaculty(req.body);
    res.status(201).json(pulpit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getPulpitsWithTeachersCount = async (req, res) => {
  const page = req.query.page || 1;
  try {
    const pulpits = await pulpitService.getPulpitsWithTeachersCount(page);
    res.json(pulpits);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении кафедр' });
  }
};

const getPulpitsCount = async (req, res) => {
  try {
    let count = await pulpitService.getPulpitsCount();
    res.json({ count: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({error : 'Data access error'});
  }
};

const getPulpitsPageHTML = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении страницы кафедр' });
  }
};



module.exports = {
  getAllPulpits,
  getPulpitsWithoutTeachers,
  updatePulpit,
  deletePulpit,
  addPulpitWithFaculty,
  getPulpitsWithTeachersCount,
  getPulpitsCount,
  getPulpitsPageHTML
};
