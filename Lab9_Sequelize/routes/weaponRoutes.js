const express = require('express');
const router = express.Router();
module.exports = (sequelize) => {
const weaponService = require('../services/weaponService')(sequelize);
const weaponController = require('../controllers/weaponController')(weaponService);

router.get('/api/weapons', weaponController.getAllWeapons);
router.get('/api/weapons/:id', weaponController.getWeaponById);
router.put('/api/weapons/:id', weaponController.updateWeapon);
router.delete('/api/weapons/:id', weaponController.deleteWeapon);
router.post('/api/weapons', weaponController.createWeapon);

return router;
}