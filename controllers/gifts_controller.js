var models  = require('../models');
var express = require('express');
var router  = express.Router();
  console.log('*** gifts_controller');

router.get('/', function(req, res) {
  res.redirect('/');
});

router.get('./date/create', function(req, res) {
  console.log('got to the creation page');
});
module.exports = router;