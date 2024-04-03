module.exports = (weaponService) => {
getAllWeapons = async (req, res) => {
  const dpsQuery = req.query.dps;
  
  if (dpsQuery) {
    const [comparison, dps] = dpsQuery.split(' ');
    if ((comparison === 'gt' || comparison === 'lt') && !isNaN(dps)) {
      const weapons = await weaponService.getWeaponsByDps(dps, comparison);
      res.json(weapons);
    } else {
      return res.status(400).json({ error: 'Invalid dps query' });
    }
  } else {
    const weapons = await weaponService.getAllWeapons();
    res.json(weapons);
  }
};

getWeaponById = async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const weapon = await weaponService.getWeaponById(id);
  res.json(weapon);
};

createWeapon = async (req, res) => {
  const newWeapon = req.body;
  if (!newWeapon.name || newWeapon.dps === undefined) {
    return res.status(400).json({ error: 'Name and DPS are required' });
  }
  const createdWeapon = await weaponService.createWeapon(newWeapon);
  res.json(createdWeapon);
};

updateWeapon = async (req, res) => {
  const id = req.params.id;
  const weaponData = req.body;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const updatedWeapon = await weaponService.updateWeapon(id, weaponData);
  res.json(updatedWeapon);
};

deleteWeapon = async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const deletedWeapon = await weaponService.deleteWeapon(id);
  res.json(deletedWeapon);
};
return {
    getAllWeapons,  
    getWeaponById,
    createWeapon,
    updateWeapon,
    deleteWeapon
};
};