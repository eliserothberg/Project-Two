var models  = require('../models');
var express = require('express');
var router  = express.Router();
console.log('*** app_controller');

router.get('/', function(req, res) {
  res.render('index');
});

module.exports = router;
