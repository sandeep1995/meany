var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var jwt = require('jsonwebtoken');
var passport = require('passport');
var mongoose = require('mongoose');

var config = require('./config/main')[process.env.NODE_ENV || 'development'];

var superadmin = require('./routes/web/superadmin/index');
var resident = require('./routes/web/resident/index');
var admin = require('./routes/web/admin/index');
var api = require('./routes/rest/api');



var app = express();

mongoose.connect(config.database, function (err) {
  if (err) {
    return console.error(err);
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendors',express.static(path.join(__dirname, 'public/vendors')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));
app.use('/bower_components',express.static(path.join(__dirname, 'public/bower_components')));



app.use('/docs',express.static(path.join(__dirname, 'public/doc/')));


/* Routes */

app.use('/api', api);

app.use('/', resident);
app.use('/admin', admin);
app.use('/superadmin', superadmin);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
