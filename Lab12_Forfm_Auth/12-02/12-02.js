const express = require('express');
const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const path = require('path');

const redisClient = redis.createClient({ host: 'localhost', port: 6379 });
const app = express();

i = 0;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.db',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 300000
  }
});

const User = require('./models/user')(sequelize);
const userService = require('./services/userService')(sequelize);
const userController = require('./controllers/userController')(userService);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/user', (req, res) => {
  userController.getUserByUsernameTest(req, res);
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', async (req, res) => {
  if( i == 0) {
      await redisClient.connect();
      i++;
  }
  const { username, password } = req.body;
  const user = await userController.getUserByUsername(req, res);
  if (!user || user.password !== password) {
    return res.redirect('/login');
  }

  const accessToken = jwt.sign({ username: user.username }, 'access-token-secret', { expiresIn: '10m' });
  const refreshToken = jwt.sign({ username: user.username }, 'refresh-token-secret', { expiresIn: '24h' });

  res.cookie('access-token', accessToken, { httpOnly: true, sameSite: 'Strict' });
  res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: 'Strict', path: '/refresh-token' });

  redisClient.set("white-" + user.id, refreshToken, 'EX', 60 * 60 * 24);

  return res.redirect('/resource');
});

app.get('/logout', (req, res) => {
  res.clearCookie('access-token');
  res.clearCookie('refresh-token');
  return res.redirect('/login');
});

app.get('/refresh-token', (req, res) => {
  const { 'refresh-token': refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  jwt.verify(refreshToken, 'refresh-token-secret', (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

     const whiteToken = redisClient.get(`white-${user.id}`);
    if (refreshToken !== whiteToken) {
      return res.sendStatus(401);
    }

    const newRefreshToken = jwt.sign({ username: user.username }, 'refresh-token-secret', { expiresIn: '24h' });

    redisClient.set(`black-${user.id}`, refreshToken, 'EX', 60 * 60 * 24);
    redisClient.set(`white-${user.id}`, newRefreshToken, 'EX', 60 * 60 * 24);

    res.cookie('access-token', newAccessToken, { httpOnly: true, sameSite: 'Strict' });
    res.cookie('refresh-token', newRefreshToken, { httpOnly: true, sameSite: 'Strict', path: '/refresh-token' });

      return res.sendStatus(204);
    });
  });

app.get('/resource', (req, res) => {
  const { 'access-token': accessToken } = req.cookies;

  if (!accessToken) {
    return res.sendStatus(401);
  }

  jwt.verify(accessToken, 'access-token-secret', (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

    return res.send(`RESOURCE: Authenticated user - ${user.username}`);
  });
});


app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  const existingUser = await userService.getUserByUsename(username);

  if (existingUser) {
    return res.status(400).send('Username is already taken');
  }

  await userService.createUser(username, password);

  return res.redirect('/login');
});


app.use((req, res) => {
  res.status(404).send('Sorry, we cannot find that!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

