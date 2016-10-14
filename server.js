// Dependencies
// ============
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session'); 
var methodOverride = require('method-override'); // for deletes in express


// This is a comment 10/13/2016
// Our model controllers (rather than routes)
var application_controller = require('./controllers/application_controller');

var events_controller = require('./controllers/events_controller');

var users_controller = require('./controllers/users_controller');

var gifts_controller = require('./controllers/gifts_controller');

//JAWSDB connection
// var models  = require('./models');
// var sequelizeConnection = models.sequelize

// var Sequelize = require('sequelize'),
//   connection;
// if (process.env.JAWSDB_URL) {
// }
// else {
//   connection = new Sequelize('eMinder', 'root', 'password', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: '3306'
//   })
// }

// //allows foreign keys
// sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')

var app = express();

// override POST to have DELETE and PUT
app.use(methodOverride('_method'))

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// uncomment after placing favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', application_controller);
app.use('/events', events_controller);
app.use('/users', users_controller);
app.use('/gifts', gifts_controller);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// error handler
// no stacktraces leaked to user unless in development environment
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: (app.get('env') === 'development') ? err : {}
//   });
// });

module.exports = app;