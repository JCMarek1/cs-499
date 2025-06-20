// --------------------------------------------
// 1. Required Dependencies & Config
// --------------------------------------------
require('dotenv').config(); // Load .env FIRST
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// --------------------------------------------
// 2. MongoDB Connection
// --------------------------------------------
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/travlr')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// --------------------------------------------
// 3. User Model
// --------------------------------------------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true } // Hashed password
});

// Password validation method
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.hash);
};

// Password hashing method
userSchema.methods.setPassword = function(password) {
  this.hash = bcrypt.hashSync(password, 10);
};

// JWT generation method
userSchema.methods.generateJwt = function() {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

const User = mongoose.model('User', userSchema);

// --------------------------------------------
// 4. Passport Configuration
// --------------------------------------------
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Invalid credentials' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// --------------------------------------------
// 5. Express App Setup
// --------------------------------------------
const app = express();
app.use(express.json());
app.use(passport.initialize());

// --------------------------------------------
// 6. Authentication Routes
// --------------------------------------------
// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  try {
    if (await User.exists({ email })) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = new User({ name, email });
    user.setPassword(password);
    await user.save();

    const token = user.generateJwt();
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
app.post('/api/auth/login', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Internal server error' });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    
    const token = user.generateJwt();
    res.status(200).json({ token });
  })(req, res);
});

// --------------------------------------------
// 7. Start Server
// --------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});