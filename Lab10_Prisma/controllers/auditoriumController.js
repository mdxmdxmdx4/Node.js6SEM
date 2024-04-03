const auditoriumService = require('../services/auditoriumService');

async function getAllAuditoriums(req, res) {
  const auditoriums = await auditoriumService.getAllAuditoriums();
  res.json(auditoriums);
}

async function getComputerAuditoriumsB1(req, res) {
  try {
    const auditoriums = await auditoriumService.getComputerClassesInBuilding1();
    res.json(auditoriums);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении компьютерных классов первого корпуса' });
  }
}

async function getAuditoriumsSameCount(req, res) {
  try {
    const auditoriums = await auditoriumService.getAuditoriumsSameCount();
    res.json(auditoriums);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении количества аудиторий с одинаковым типом и вместимостью' });
  }
}

async function updateAuditorium(req, res) {
  const auditoriumData = req.body;
  try {
    const updatedAuditorium = await auditoriumService.updateAuditorium(auditoriumData);
    res.status(200).json(updatedAuditorium);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении аудитории' });
  }
}

async function deleteAuditorium(req, res) {
  const id = parseInt(req.params.id);
  try {
    const deletedAuditorium = await auditoriumService.deleteAuditorium(id);
    if (deletedAuditorium) {
      res.status(200).json(deletedAuditorium);
    } else {
      res.status(404).json({ message: 'Аудитория не найдена' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при удалении аудитории' });
  }
}

async function addAuditorium(req, res) {
  try {
    const auditorium = await auditoriumService.addAuditorium(req.body);
    res.status(201).json(auditorium);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getSpecificAuditoriums(req, res) {
  try {
    const auditoriums = await auditoriumService.getSpecificAuditoriums();
    res.json(auditoriums);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка при получении аудиторий' });
  }
}


const incrementCapacity = async (req, res) => {
  try {
    await auditoriumService.incrementCapacity();
    res.json({ message: 'Capacity updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while processing the transaction' });
  }
};


module.exports = {
  getAllAuditoriums,
  getComputerAuditoriumsB1,
  getAuditoriumsSameCount,
  updateAuditorium,
  deleteAuditorium,
  addAuditorium,
  getSpecificAuditoriums,
  incrementCapacity
};