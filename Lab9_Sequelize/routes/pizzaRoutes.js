const express = require('express');
const router = express.Router();
module.exports = (sequelize) => {
const pizzaService = require('../services/pizzaService')(sequelize);
const pizzaController = require('../controllers/pizzaController')(pizzaService);

router.get('/api/pizzas', pizzaController.getAllPizzas);
router.get('/api/pizzas/:id', pizzaController.getPizzaById);
router.put('/api/pizzas/:id', pizzaController.updatePizza);
router.delete('/api/pizzas/:id', pizzaController.deletePizza);
router.post('/api/pizzas', pizzaController.createPizza);
router.get('/fat', pizzaController.updatePizzaFat);

return router;
}