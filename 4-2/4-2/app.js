require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const passport = require('passport');

// Database and Passport config
require('./app_api/models/db');
require('./app_api/config/passport');

// Route imports
const travelRouter = require('./app_server/routes/travel');
const apiRoutes = require('./app_api/routes/index');
const tripsRouter = require('./app_server/routes/trips');

const app = express();

// View engine setup (FIXED TYPO IN __dirname)
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(
  path.join(__dirname, 'app_server', 'views', 'partials'),
  (err) => {
    if(err) console.error('Partials registration error:', err);
    else console.log('Partials registered successfully');
  }
);

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.get('/travel', (req, res) => {
  res.render('travel', {
    title: 'Travel Packages',
    trips: trips,
    layout: 'layout'
  });
});

app.get('/trips/:code', (req, res) => {
  const tripCode = req.params.code;
  const trip = trips.find(t => t.code === tripCode);
  
  if (!trip) {
    return res.status(404).send('Trip not found');
  }

  res.render('trip-details', {
    title: `${trip.name} Details`,
    trip: trip,
    layout: 'layout'
  });
});

// Static files
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// CORS Configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  req.method === 'OPTIONS' ? res.sendStatus(200) : next();
});

// Main routes
const mainRoutes = [
  { path: '/', template: 'index', title: 'Home' },
  { path: '/rooms', template: 'rooms', title: 'Rooms' },
  { path: '/meals', template: 'meals', title: 'Meals' },
  { path: '/news', template: 'news', title: 'News' },
  { path: '/about', template: 'about', title: 'About' },
  { path: '/contact', template: 'contact', title: 'Contact' }
];

mainRoutes.forEach(route => {
  app.get(route.path, (req, res) => res.render(route.template, {
    title: route.title,
    layout: 'layout'
  }));
});

// Other routes
app.use('/trips', tripsRouter);
app.use('/api', apiRoutes);

// Error handlers
app.use((req, res, next) => next(createError(404)));

app.use((err, req, res, next) => {
  const errorContext = {
    title: `Error ${err.status || 500}`,
    status: err.status || 500,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  };
  console.error(`Error ${errorContext.status}: ${errorContext.message}`);
  res.status(errorContext.status).render('error', errorContext);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

module.exports = app;