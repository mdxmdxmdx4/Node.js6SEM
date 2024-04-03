module.exports = (sequelize) => {
     const { Op } = require('sequelize');
  const Pizza = require('../models/Pizza')(sequelize);

  async function getAllPizzas() {
    return await Pizza.findAll();
  }

  async function getPizzaById(id) {
    return await Pizza.findByPk(id);
  }

  async function getPizzasByCalories(calories, comparison) {
    if (comparison === 'gt') {
      return await Pizza.findAll({
        where: {
          calories: {
            [Op.gt]: calories
          }
        }
      });
    } else if (comparison === 'lt') {
      return await Pizza.findAll({
        where: {
          calories: {
            [Op.lt]: calories
          }
        }
      });
    }
  }

  async function createPizza(pizzaData) {
    if (pizzaData.calories > 5000) {
      throw new Error('Calories cannot be more than 5000');
    }
    return await Pizza.create(pizzaData);
  }

  async function updatePizza(id, pizzaData) {
    if (pizzaData.calories > 5000) {
      throw new Error('Calories cannot be more than 5000');
    }
    await Pizza.update(pizzaData, {
      where: {
        id: id
      }
    });
    return await Pizza.findByPk(id);
  }

  async function deletePizza(id) {
    const pizza = await Pizza.findByPk(id);
    if (pizza) {
      await pizza.destroy();
    }
    return pizza;
  }

  async function updatePizzaFatDescription() {
  return sequelize.transaction(async (t) => {
    let pizzas = await Pizza.findAll({
      where: {
        calories: {
          [Op.gt]: 1500
        }
      },
      transaction: t
    });

    for (let pizza of pizzas) {
      pizza.description = pizza.description ? pizza.description + ' SUPER FAT!' : 'SUPER FAT!';
      await pizza.save({ transaction: t });
    }
  });
}

  return {
    getAllPizzas,
    getPizzaById,
    getPizzasByCalories,
    createPizza,
    updatePizza,
    deletePizza,
    updatePizzaFatDescription
  };
};
