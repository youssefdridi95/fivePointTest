var express = require('express');
var cors = require('cors')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

const jwt = require('jsonwebtoken');

var db = require('./db');
global.__root   = __dirname + '/'; 


    // Add headers for CORS enabled
    app.use(function (req, res, next) {

      // Website to allow to connect - All
      res.setHeader('Access-Control-Allow-Origin', '*');
    
      // Request methods  to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
      // Request headers to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);
    
      // Pass to next layer of middleware
      next();
    });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UserController = require(__root + 'user/UserController');
app.use('/api/users', UserController);



var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

var SubjectController =require(__root+'subject/subjectController');
app.use('/api/subjects',SubjectController)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ 
    message: err.message,
    error: err })

});

module.exports = app;