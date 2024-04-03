const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');


const users = require('./users.json');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    let user = users.find((user) => user.username === username);
    if (user === undefined) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
  let user = users.find((user) => user.username === username);
  if (user !== undefined) {
    cb(null, user);
  } else {
    cb(new Error('User not found: ' + username));
  }
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/resource');
});

app.get('/logout', function(req, res){
  res.clearCookie('connect.sid');
  req.logout(function(err) {  // logout of passport
    req.session.destroy(function (err) { // destroy the session
      res.send('Доступ отключен'); // send to the client
    });
});
});

app.get('/resource', function(req, res) {
  if(req.isAuthenticated()) {
    res.send('RESOURCE: Authenticated user - ' + req.user.username);
  } else {
    res.status(401).send('You are not authenticated');
  }
});

app.use(function(req, res){
  res.status(404).send('Sorry, we cannot find that!');
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});
