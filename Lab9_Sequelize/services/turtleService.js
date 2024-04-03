module.exports = (sequelize) => {
  const Turtle = require('../models/Turtle')(sequelize);
  const Pizza = require('../models/Pizza')(sequelize);

  async function getAllTurtles() {
    return await Turtle.findAll();
  }

  async function getTurtleById(id) {
    return await Turtle.findByPk(id);
  }

async function getTurtlesByFavoritePizza(pizzaName) {
  return await Turtle.findAll({
    where: {
      '$favoritePizza.name$': pizzaName
    },
    include: [{
      model: Pizza,
      as: 'favoritePizza'
    }]
  });
}


  async function createTurtle(turtleData) {
    return await Turtle.create(turtleData);
  }

  async function updateTurtle(id, turtleData) {
    await Turtle.update(turtleData, {
      where: {
        id: id
      }
    });
    return await Turtle.findByPk(id);
  }

  async function deleteTurtle(id) {
    const turtle = await Turtle.findByPk(id);
    if(turtle){
      await turtle.destroy();
    }
    return turtle;
  }

  async function getTurtlesPage(page = 1, limit = 3) {
  let offset = (page - 1) * limit;
  return await Turtle.findAll({ limit: limit, offset: offset });
}

  async function getTurtlesCount() {
  return await Turtle.count();
}

  return {
    getAllTurtles,
    getTurtleById,
    getTurtlesByFavoritePizza,
    createTurtle,
    updateTurtle,
    deleteTurtle,
    getTurtlesPage,
    getTurtlesCount
  };
};
