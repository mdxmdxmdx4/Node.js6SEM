const auditoriumTypeService = require('../services/auditoriumTypeService');

async function getAllAuditoriumTypes(req, res) {
  const auditoriumTypes = await auditoriumTypeService.getAllAuditoriumTypes();
  res.json(auditoriumTypes);
}

async function getAuditoriumsByType(req, res) {
  const typeCode = req.params.type;
  try {
  const auditoriumTypeList = await auditoriumTypeService.getAuditoriumsByType(typeCode);
  res.json(auditoriumTypeList);
} catch (error) {
  console.log(error);
}
}

async function updateAuditoriumType(req, res) {
  const auditoriumTypeData = req.body;
  try {
    const updatedAuditoriumType = await auditoriumTypeService.updateAuditoriumType(auditoriumTypeData);
    res.status(200).json(updatedAuditoriumType);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при обновлении типа аудитории' });
  }
}

async function deleteAuditoriumType(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deletedAuditoriumType = await auditoriumTypeService.deleteAuditoriumType(id);
    res.json(deletedAuditoriumType);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении типа аудитории' });
  }
}

async function addAuditoriumType(req, res) {
  try {
    const auditoriumType = await auditoriumTypeService.addAuditoriumType(req.body);
    res.status(201).json(auditoriumType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  getAllAuditoriumTypes,
  getAuditoriumsByType,
  updateAuditoriumType,
  deleteAuditoriumType,
  addAuditoriumType
};
