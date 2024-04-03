const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DigestStrategy = require('passport-http').DigestStrategy;
const app = express();

const users = require('./users.json');
isAuth = false;
cnt = 0;

passport.use(new DigestStrategy({ qop: 'auth' },
  function(username, done) {
    const user = users.find(u => u.username === username);
    if (!user) { return done(null, false); }
    return done(null, user, user.password);
  },
  function(params, done) {
    done(null, true)
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

app.get('/login', (req, res, next) => {
/*   if (!isAuth && req.headers.authorization && cnt > 0) {
            req.session.logout = false;
            req.headers.authorization = "";
            if(cnt <= 0){
              cnt = 0
            }
            else
            cnt--;
        }*/
  passport.authenticate('digest', { session: false })(req, res, next);
}, (req, res) => {
         // isAuth = true;
          //cnt++;
  res.send('Аутентификация прошла успешно');
});


app.get('/logout', function(req, res, next){
  isAuth = false;
   res.clearCookie('connect.sid');
  req.logout(function(err) {
    req.session.logout = true;
    req.session.destroy(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send('Вы вышли из системы')
    }
  });
  });
});

app.get('/resource', (req, res) => {
  if (req.isAuthenticated() */ isAuth*/) {
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