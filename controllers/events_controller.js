var models  = require('../models');
var express = require('express');
var router  = express.Router();
var eventArray = [];

    console.log("****events_controller");

router.get('/', function(req, res) {
  var holder=[];
  console.log('In the events controller');  
  console.log(req.session.email);
  console.log(req.session.id);
  console.log(req.session.logged_in);
  //Find all to get the gifts and the user tracking them
  //THIS IS NOT WORKING  
  var renderObj ={
    recipient_name:"",
    event_date:0,
    event_type:""
  };
  return models.User.findAll({
    where:{

    }
    // include: [ models.User ]
  })
  // connect the findAll to this .then
  .then(function(events) {
    // clear event array
    eventArray=[];
    console.log("* * * just before render -events controller");
    console.log(events[0].event_date,events[0].event_type);
    renderObj.recipient_name=events[0].recipient_name;
    renderObj.event_date=events[0].event_date;
    renderObj.event_type=events[0].event_type;
    console.log(renderObj);
    holder.push(renderObj);
    console.log(holder);
    var passObj={eventsdisp:holder};
    console.log(passObj);
    // grab the user info from our req. from the users_controller.js file.
    res.render('./gifts/index', {
      eventdisp:holder,
      username:req.session.username,
      logged_in: req.session.logged_in
    });
  });
});

router.post('/create', function (req, res) {
 //create event
 console.log('creating the event');
 console.log(req.body.name, req.body.date, req.body.type);
  return models.Event.create({
    recipient_name: req.body.name,
    event_date: req.body.date,
    event_type: req.body.type,
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
