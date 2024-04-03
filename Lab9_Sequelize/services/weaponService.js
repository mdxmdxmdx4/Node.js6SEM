module.exports = (sequelize) => {
   const { Op } = require('sequelize');
  const Weapon = require('../models/Weapon')(sequelize);

  async function getAllWeapons() {
    return await Weapon.findAll();
  }

  async function getWeaponById(id) {
    return await Weapon.findByPk(id);
  }

  async function getWeaponsByDps(dps, comparison) {
    if (comparison === 'gt') {
      return await Weapon.findAll({
        where: {
          dps: {
            [Op.gt]: dps
          }
        }
      });
    } else if (comparison === 'lt') {
      return await Weapon.findAll({
        where: {
          dps: {
            [Op.lt]: dps
          }
        }
      });
    }
  }

  async function createWeapon(weaponData) {
    if (weaponData.dps > 500) {
      throw new Error('DPS cannot be more than 500');
    }
    return await Weapon.create(weaponData);
  }

  async function updateWeapon(id, weaponData) {
    if (weaponData.dps > 500) {
      throw new Error('DPS cannot be more than 500');
    }
    await Weapon.update(weaponData, {
      where: {
        id: id
      }
    });
    return await Weapon.findByPk(id);
  }

  async function deleteWeapon(id) {
    const weapon = await Weapon.findByPk(id);
    if (weapon) {
      await weapon.destroy();
    }
    return weapon;
  }

  return {
    getAllWeapons,
    getWeaponById,
    getWeaponsByDps,
    createWeapon,
    updateWeapon,
    deleteWeapon
  };
};
