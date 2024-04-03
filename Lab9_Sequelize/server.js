const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'images/' });
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './LDI',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 300000
  }
});

const Turtle = require('./models/Turtle')(sequelize);
const turtleService = require('./services/turtleService')(sequelize);


const weaponRoutes = require('./routes/weaponRoutes')(sequelize);
app.use(weaponRoutes);
const pizzaRoutes = require('./routes/pizzaRoutes')(sequelize);
app.use(pizzaRoutes);
const turtleRoutes = require('./routes/turtleRoutes')(sequelize);
app.use(turtleRoutes);



//images
app.use('/images', express.static('images'));

app.use('/images/*', (req, res) => {
  res.status(404).json({ error: 'File not found' });
});

//---task5---//
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

app.post('/upload', upload.single('image'), async (req, res) => {
  let turtleId = req.body.turtleId;
  let turtle = await Turtle.findByPk(turtleId);
  if (!turtle) {
    return res.status(404).send('Черепашка-ниндзя с указанным идентификатором не найдена');
  }

  let imagePath = path.join('images', `turtle_${turtleId}.jpg`);

  fs.rename(req.file.path, imagePath, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Произошла ошибка при сохранении изображения');
    }

    turtle.image = imagePath;
    turtle.save();
    res.send('Изображение успешно загружено');
  });
});

//---task5---//
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});



//turtle
//---pagination---
/*app.get('/turtles', async (req, res) => {
  let page = req.query.page || 1;
  let limit = 3;
  let offset = (page - 1) * limit;

  try {
    let turtles = await Turtle.findAll({ limit: limit, offset: offset });
    res.sendFile(path.join(__dirname, 'public', 'turtles.html'));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Data access error'});
  }
});

app.get('/turtles/get', async (req, res) => {
  let page = req.query.page || 1;
  let limit = 3;
  let offset = (page - 1) * limit;

  try {
    let turtles = await Turtle.findAll({ limit: limit, offset: offset });
    res.json(turtles);
  } catch (err) {
    console.error(err);
    res.status(500).josn({ error: 'Data access error'});
  }
});

app.get('/turtles/count', async (req, res) => {
  try {
    let count = await Turtle.count();
    res.json(count);
  } catch (err) {
    console.error(err);
    res.status(500).json({error : 'Data access error'});
  }
});*/
//---pagination---
