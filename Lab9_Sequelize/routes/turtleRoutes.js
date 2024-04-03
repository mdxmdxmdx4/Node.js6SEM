const express = require('express');
const router = express.Router();
module.exports = (sequelize) => {
const turtleService = require('../services/turtleService')(sequelize);
const turtleController = require('../controllers/turtleController')(turtleService);


router.get('/api/turtles', turtleController.getAllTurtles);
router.get('/api/turtles/:id', turtleController.getTurtleById)
router.get('/api/turtles', turtleController.favoritePizza);
router.post('/api/turtles', turtleController.createTurtle);
router.put('/api/turtles/:id', turtleController.updateTurtle);
router.delete('/api/turtles/:id', turtleController.deleteTurtle);
router.put('/api/turtles/:id/favoritePizzaBind', favPizzaBind);
router.put('/api/turtles/:id/secondFavoritePizzaBind', secFavPizzaBind);
router.put('/api/turtles/:id/weaponBind', weaponBind);
router.delete('/api/turtles/:id/favoritePizzaUnbind', favoritePizzaUnbind);
router.delete('/api/turtles/:id/secondFavoritePizzaUnbind', secondFavoritePizzaUnbind);
router.delete('/api/turtles/:id/weaponUnbind', weaponUnbind);
router.get('/turtles', turtleController.getTurtlesPage);
router.get('/turtles/count', turtleController.getTurtlesCount);
router.get('/turtles/get', turtleController.getTurtlesPageAlt);

return router;
}