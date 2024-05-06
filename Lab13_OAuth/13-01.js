require('dotenv').config()
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const session = require('express-session');

const app = express();

app.use(session({ secret: 'SECRET_KEY', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => done(null, profile)
));

app.get('/login', (req, res) => {
  res.send(`
    <html>
      <body>
        <a href="/auth/google"><button>Войти через Google</button></a>
      </body>
    </html>
  `);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', passport.authenticate(
  'google', { failureRedirect: '/login' }), (req, res) => res.redirect('/resource')
);

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
       const {id, name: {givenName, familyName}, photos} = req.user;
       const profileUrl = photos[0].value;

        res.send(`
      <html lang="en">
        <body>
          <h1>RESOURCE</h1>
          <p>id: ${id}</p>
          <p>username: ${givenName} ${familyName}</p>
          <img src="${profileUrl}"></img>
        </body>  
      </html>
    `);
    }
    else {
        res.redirect('/login');
    }
});

app.use((req, res) => res.status(404).send('404 Not Found'));

app.listen(3000, () => console.log('Server listening on port 3000'));
