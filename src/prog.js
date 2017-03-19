var express = require('express');
var path = require('path');
var logger = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var expressHelpers = require('express-helpers');
var bodyParser = require('body-parser');
var indexRoute = require('./routes/index');
var loginRoute = require('./routes/login');
var logoutRoute = require('./routes/logout');
var profileRoute = require('./routes/profile');
var authorization = require('./auth');

// Create a new Express application.
var app = express();
var helpers = expressHelpers(app);

// Configure view engine to render pug templates
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

// Use application-level middleware for common functionality
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the session
authorization.setup();
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/profile', profileRoute);
app.use('/logout', logoutRoute);
  
module.exports = app;
