var express = require('express');
var path = require('path');
var logger = require('morgan');
var passport = require('passport');
const mongoose = require('mongoose');

var timesRouter = require('./routes/times');
var admsRouter = require('./routes/adms');
var jogadoresRouter = require('./routes/jogadores');
var partidasRouter = require('./routes/partidas');
var usersRouter = require('./routes/users');
var config = require('./config');

const url =  config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Conectado ao MongoDB!");
}, (err) => { console.log(err); });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/times', timesRouter);
app.use('/adms', admsRouter);
app.use('/jogadores', jogadoresRouter);
app.use('/partidas', partidasRouter);

module.exports = app;