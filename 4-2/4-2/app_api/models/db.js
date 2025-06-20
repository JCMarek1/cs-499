const mongoose = require('mongoose');
const debug = require('debug')('travlr:db');

// Remove any existing connection handlers
mongoose.connection.removeAllListeners();

const connectWithRetry = () => {
  const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
  
  // Check if already connected
  if (mongoose.connection.readyState === 1) {
    debug('Already connected to MongoDB');
    return Promise.resolve();
  }

  return mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
  .then(() => debug('Connected to MongoDB'))
  .catch(err => {
    debug(`Connection failed: ${err.message}`);
    debug('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  });
};

// Handle connection events
mongoose.connection.on('connected', () => debug('Mongoose connected to MongoDB'));
mongoose.connection.on('error', err => debug(`Mongoose connection error: ${err}`));
mongoose.connection.on('disconnected', () => debug('Mongoose disconnected'));

// Export the connection function
module.exports = connectWithRetry;