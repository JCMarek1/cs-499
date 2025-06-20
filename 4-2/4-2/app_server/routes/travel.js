// routes/travel.js
var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/travel');

router.get('/', ctrlMain.travel);

module.exports = router;
