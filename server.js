const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('./data/database');
const dotenv = require('dotenv'); 
const bodyParser = require('body-parser');
const passport = require('passport');
const { body } = require('express-validator');
const GitubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const session = require('express-session');


const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods', 
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']}))
  .use(cors({ origin: '*' }))
  .use('/', require('./routes/index'));

  passport.use(new GitubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
  ));


process.on('uncaughtException', (err) => {
  console.log(process.stderr.fd, `Caught execption: ${err}` + `Exception origin: ${origin}`);
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out')});

app.get('/github/callback', passport.authenticate('github', { 
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and node running on port ${port}`);
    });
  }
});
