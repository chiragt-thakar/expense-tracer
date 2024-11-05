var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const { jwtStrategy } = require('./configs/passport');



var indexRouter = require('./src/routes');
// var usersRouter = require('./src/routes/user.route.js');
const { error } = require('console');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/v1', indexRouter);
// app.use('/users', usersRouter);

// const finalErrorHandler = (error,req, res, ) =>{
//   res.send()
// }

module.exports = app;
