var models  = require('../models');
var express = require('express');
var router  = express.Router();
  console.log('*** gifts_controller');

router.get('/', function(req, res) {
  res.redirect('/');
});

module.exports = router;