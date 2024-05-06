require('dotenv').config()
const express = require('express');
const { Sequelize } = require('sequelize');
const tls = require('tls');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { AbilityBuilder, Ability } = require('@casl/ability');

tls.DEFAULT_MIN_VERSION = 'TLSv1';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const sequelize = new Sequelize('lab_24', process.env.login, process.env.password, {
  host: process.env.host,
  dialect: 'mssql'
});

sequelize.authenticate()
  .then(() => console.log('Успешное подключение к базе данных.'))
  .catch((error) => console.error('Ошибка подключения к базе данных:', error));

const userService = require('./service/userService.js')(sequelize);
const userController = require('./controller/userController')(userService);

const repoService = require('./service/repoService.js')(sequelize);
const repoController = require('./controller/repoController')(repoService);

const commitService = require('./service/commitService.js')(sequelize);
const commitController = require('./controller/commitController')(commitService, repoService);

const authenticate = (req, res, next) => {
  const { 'access-token': accessToken } = req.cookies;

  if (!accessToken) {
    req.user = { role: 'guest' };
    next();
  } else {
    try {
      const user = jwt.verify(accessToken, 'access-token-secret');
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid access token' });
    }
  }
};


function defineAbilitiesFor(role) {
  const { can, rules } = new AbilityBuilder(Ability);

  if (role === 'guest') {
    can('read', 'Commit');
    can('read', 'Repo');
  }

  if (role === 'user') {
    can('read', 'User');
    can('manage', 'Repo', { username: role.username });
    can('manage', 'Commit', { username: role.username });
  }

  if (role === 'admin') {
    can('manage', 'all');
  }

  return new Ability(rules);
}

function checkPermission(action, subject) {
  return (req, res, next) => {
    const user = req.user;
    const ability = defineAbilitiesFor(user.role);

    if (ability.can(action, subject)) {
      next();
    } else {
      res.status(403).json({ error: 'You do not have permission to access this resource' });
    }
  };
}

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', userController.login);

app.get('/logout', userController.logout);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
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

    const newAccessToken = jwt.sign({id: user.id, username: user.username, role: user.role }, 'access-token-secret', { expiresIn: '10m' });
    const newRefreshToken = jwt.sign({id: user.id, username: user.username, role: user.role }, 'refresh-token-secret', { expiresIn: '24h' });

    res.cookie('access-token', newAccessToken, { httpOnly: true, sameSite: 'None', secure: true });
    res.cookie('refresh-token', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, path: '/refresh-token' });

    return res.sendStatus(204);
  });
});

app.post('/register', userController.register);

app.get('/api/ability', authenticate, (req, res) => {
  const ability = defineAbilitiesFor(req.user.role);
  res.json(ability.rules);
});

app.get('/api/user', authenticate, checkPermission('manage', 'all'), userController.getUsers);
app.get('/api/user/:id', authenticate, checkPermission('read', 'User'), userController.getUserById);

app.get('/api/repos', authenticate, checkPermission('read', 'Repo'), repoController.getAllRepos);
app.get('/api/repos/:id', authenticate, checkPermission('read', 'Repo'), repoController.getRepoById);
app.post('/api/repos', authenticate, checkPermission('create', 'Repo'), repoController.createRepo);
app.put('/api/repos/:id', authenticate, checkPermission('update', 'Repo'), repoController.updateRepo);
app.delete('/api/repos/:id', authenticate, checkPermission('delete', 'Repo'), repoController.deleteRepo);

app.get('/api/repos/:id/commits', authenticate, checkPermission('read','Commit'), commitController.getAllCommits);
app.get('/api/repos/:id/commits/:commitId', authenticate, checkPermission('read','Commit'), commitController.getCommitById);
app.post('/api/repos/:id/commits', authenticate, checkPermission('create','Commit'), commitController.createCommit);
app.put('/api/repos/:id/commits/:commitId', authenticate, checkPermission('create','Commit'), commitController.updateCommit);
app.delete('/api/repos/:id/commits/:commitId', authenticate, checkPermission('delete','Commit'), commitController.deleteCommit);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
