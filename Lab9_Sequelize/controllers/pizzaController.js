module.exports = (pizzaService) => {
getAllPizzas = async (req, res) => {
  const caloriesQuery = req.query.calories;
  if(caloriesQuery){
  const [comparison, calories] = caloriesQuery.split(' ');
  if ((comparison === 'gt' || comparison === 'lt') && !isNaN(calories)) {
    const pizzas = await pizzaService.getPizzasByCalories(calories, comparison);
    res.json(pizzas);
  }
  else{
    return res.status(400).json({ error: 'Invalid query parameters'  });
  }
} else {
  const pizzas = await pizzaService.getAllPizzas();
  res.json(pizzas);
  }
};

getPizzaById =  async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const pizza = await pizzaService.getPizzaById(id);
  res.json(pizza);
};

createPizza =  async (req, res) => {
  const newPizza = req.body;
  if (!newPizza.name || newPizza.calories === undefined) {
    return res.status(400).json({ error: 'Name and calories are required' });
  }
  const createdPizza = await pizzaService.createPizza(newPizza);
  res.json(createdPizza);
};

updatePizza = async (req, res) => {
  const id = req.params.id;
  const pizzaData = req.body;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const updatedPizza = await pizzaService.updatePizza(id, pizzaData);
  res.json(updatedPizza);
};

deletePizza =  async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be a number' });
  }
  const deletedPizza = await pizzaService.deletePizza(id);
  res.json(deletedPizza);
};

updatePizzaFat = async (req, res) => {
    try {
      await pizzaService.updatePizzaFatDescription();
      res.send('Транзакция была успешно выполнена');
    } catch (err) {
      console.error('Произошла ошибка при выполнении транзакции:', err);
      res.status(500).json({ error: 'Transaction execution error' });
    }
  };

return {
    getAllPizzas,  
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza,
    updatePizzaFat
};
}