var models  = require('../models');
var express = require('express');
var router  = express.Router();


router.get('/', function(req, res) {
    console.log("****events_controller");

  //Find all to get the gifts and the user tracking them
  //THIS IS NOT WORKING  
  models.Event.findAll({
    include: [ models.User ]
  })
  // connect the findAll to this .then
  .then(function(events) {
    console.log("* * * just before render");
    // grab the user info from our req. from the users_controller.js file.
    res.render('gifts/index', {
      user_id: req.session.user_id,
      email: req.session.user_email,
      logged_in: req.session.logged_in,
      events: events
    });
  });
});

router.post('/create', function (req, res) {
 //create event
  models.Event.create({
    event_name: req.body.name,
    day: req.body.day,
    gift_name: req.body.gift_name,
    user_id: req.session.user_id
  })
  // connect the .create to this .then
  .then(function() {
    res.redirect('/');
  });
});

// router.put('/update/:id', function(req,res) {
  
//   // =========
//   // update tracking status of gift
//   // not sure how to do this yet, thought do know to reference ID
 
//   models.Event.update(
//   {
    
//   },
//   {
//     where: { id : req.params.id }
//   })
//   // connect it to this .then.
//   .then(function (result) {
//     res.redirect('/');
//   }, function(rejectedPromiseError){

//   });
// });


router.delete('/delete/:id', function(req,res) {
  //Delete event based on the id passed in the url
  models.Event.destroy({
    where: {
      id: req.params.id
    }
  })
  // connect it to this .then.
  .then(function() {
    res.redirect('/');
  });

});


module.exports = router;
