const express = require('express');
const session = require('express-session');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();

const users = require('./users.json');

passport.use(new BasicStrategy(
  function(username, password, done) {
    const user = users.find(u => u.username === username);
    if (!user) { return done(null, false); }
    if (user.password !== password) { return done(null, false); }
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  const user = users.find(u => u.username === username);
  done(null, user);
});

app.use(session({ secret: 'asdonasdnojaopdsnpiq9h', resave: false, saveUninitialized: false, cookie: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('basic'), (req, res) => {
  res.send('Аутентификация прошла успешно');
});


app.get('/logout', function(req, res){
  res.clearCookie('connect.sid');
  req.logout(function(err) {  
    req.session.destroy(function (err) {
      res.send('Доступ отключен');
    });
});
});

app.get('/resource', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('RESOURCE');
  } else {
    res.redirect('/login');
  }
});

app.get('*', (req, res) => {
  res.status(404).send('Страница не найдена');
});

app.listen(3000, () => {
  console.log('Сервер слушает порт 3000');
});