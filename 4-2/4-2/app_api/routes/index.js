const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const { expressjwt: jwt } = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // Add this line
  userProperty: "payload"
});


// DEFINE ROUTE FOR OUR TRIPS ENDPOINT
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);
router
    .route('/trips') 
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

// GET METHOD ROUTES tripsFindByCode - REQUIRE PARAMETER
//PUT Method
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;