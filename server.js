const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('./data/database');
const dotenv = require('dotenv'); 
const bodyParser = require('body-parser');
const { body } = require('express-validator');

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-with, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

process.on('uncaughtException', (err) => {
  console.log(process.stderr.fd, `Caught execption: ${err}` + `Exception origin: ${origin}`);
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
