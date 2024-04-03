const path = require('path');

module.exports = (turtleService) => {
getAllTurtles =  async (req, res) => {
  const turtles = await turtleService.getAllTurtles();
  res.json(turtles);
};

getTurtleById =  async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const turtle = await turtleService.getTurtleById(id);
  res.json(turtle);
};

favoritePizza =  async (req, res) => {
  const favoritePizza = req.query.favoritePizza;
  if (favoritePizza) {
    const turtles = await turtleService.getTurtlesByFavoritePizza(favoritePizza);
    res.json(turtles);
  } else {
    const turtles = await turtleService.getAllTurtles();
    res.json(turtles);
  }
};

createTurtle = async (req, res) => {
  const newTurtle = req.body;
  if (!newTurtle.name || !newTurtle.color || !newTurtle.image) {
    return res.status(400).json({ error: 'Name and color are required' });
  }
  const createdTurtle = await turtleService.createTurtle(newTurtle);
  res.json(createdTurtle);
};

updateTurtle =  async (req, res) => {
  const id = req.params.id;
  const turtleData = req.body;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const updatedTurtle = await turtleService.updateTurtle(id, turtleData);
  res.json(updatedTurtle);
};

deleteTurtle =  async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const deletedTurtle = await turtleService.deleteTurtle(id);
  res.json(deletedTurtle);
};

favPizzaBind = async (req, res) => {
  const id = req.params.id;
  const pizzaId = req.body.pizzaId;
  if (isNaN(id) || isNaN(pizzaId)) {
    return res.status(400).json({ error: 'ID and pizzaId must be numbers' });
  }
  const updatedTurtle = await turtleService.updateTurtle(id, { favoritePizzaId: pizzaId });
  res.json(updatedTurtle);
};

secFavPizzaBind = async (req, res) => {
  const id = req.params.id;
  const pizzaId = req.body.pizzaId;
  if (isNaN(id) || isNaN(pizzaId)) {
    return res.status(400).json({ error: 'ID and pizzaId must be numbers' });
  }
  const updatedTurtle = await turtleService.updateTurtle(id, { secondFavoritePizzaId: pizzaId });
  res.json(updatedTurtle);
};

weaponBind =  async (req, res) => {
  const id = req.params.id;
  const weaponId = req.body.weaponId;
  if (isNaN(id) || isNaN(weaponId)) {
    return res.status(400).json({ error: 'ID and weaponId must be numbers' });
  }
  const updatedTurtle = await turtleService.updateTurtle(id, { weaponId: weaponId });
  res.json(updatedTurtle);
};

favoritePizzaUnbind =  async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const updatedTurtle = await turtleService.updateTurtle(id, { favoritePizzaId: null });
  res.json(updatedTurtle);
};

secondFavoritePizzaUnbind =  async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const updatedTurtle = await turtleService.updateTurtle(id, { secondFavoritePizzaId: null });
  res.json(updatedTurtle);
};

weaponUnbind =  async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const updatedTurtle = await turtleService.updateTurtle(id, { weaponId: null });
  res.json(updatedTurtle);
};

const getTurtlesPage = async (req, res) => {
    let page = req.query.page || 1;
    let limit = 3;
    try {
      await turtleService.getTurtlesPage(page, limit);
      res.sendFile(path.join(__dirname, '..', 'public', 'turtles.html'));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Data access error'});
    }
  };

  const getTurtlesCount = async (req, res) => {
    try {
      let count = await turtleService.getTurtlesCount();
      res.json(count);
    } catch (err) {
      console.error(err);
      res.status(500).json({error : 'Data access error'});
    }
  };

  const getTurtlesPageAlt = async (req, res) => {
    let page = req.query.page || 1;
    let limit = 3;
    try {
      let turtles = await turtleService.getTurtlesPage(page, limit);
      res.json(turtles);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Data access error'});
    }
  };

return {
    getAllTurtles,  
    getTurtleById,
    favoritePizza,
    createTurtle,
    updateTurtle,
    deleteTurtle,
    favPizzaBind,
    secFavPizzaBind,
    weaponBind,
    favoritePizzaUnbind,
    secondFavoritePizzaUnbind,
    weaponUnbind,
    getTurtlesPage,
    getTurtlesCount,
    getTurtlesPageAlt
};
}