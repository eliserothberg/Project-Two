var models  = require('../models');
var express = require('express');
var router  = express.Router();
var eventArray = [];
var userId=0;
var sessionId="";
var loggedIn=false;
var email="";
    console.log("****events_controller");

router.get('/', function(req, res) {
  var holder=[];
  console.log('In the events controller');
  if (userId ==0) {
    userId=req.session.user_id;
    sessionId=req.sessionId;
    loggedIn=true;
    email=req.session.email;
  };
  // console.log(userId); 
  // console.log(req.session.email);
  // console.log(req.session.user_id);
  // console.log(req.session.logged_in);
  // var renderObj ={
  //   recipient_name:"",
  //   event_date:0,
  //   event_type:""
  // };
  return models.User.findOne({
    where:{
      id:userId
    }
    // include: [ models.User ]
  })
  // connect the findAll to this .then
  .then(function(user) {
    return user.getEvents();
  }).then(function(events){
    // clear event array
    eventArray=[];
    var doThey=false;
    console.log('In yet again');
    // console.log(user);
    console.log(events.length);
    console.log("* * * just before render -events controller");
    for (var j=0;j<events.length;j++){
      // renderObj=events[j].dataValues;
      // renderObj.recipient_name=events[j].recipient_name;
      // renderObj.event_date=events[j].event_date;
      // renderObj.event_type=events[j].event_type;
      eventArray[j]=events[j].dataValues;
      // console.log(eventArray[j]);
    }
    // console.log('Loaded the eventArray');
    // for (var k=0;k<eventArray.length;k++){
    //   console.log('here is the event array:');
    //   console.log(eventArray[k]);
    //   console.log('here is the dataValue');
    //   console.log(events[k].dataValues);
    // }
    // console.log(events[0].event_date,events[0].event_type);
    // console.log(renderObj);
    // console.log(holder);
    // var passObj={eventsdisp:holder};
    // console.log(passObj);  
    // console.log('holder '+ holder.length);
    if (eventArray.length>0){doThey=true};

    res.render('./gifts/index', {
      eventdisp:eventArray,
      username:sessionId,
      logged_in: loggedIn,
      eventsExist:doThey,
      id:userId
    });
  });
});

router.post('/create', function (req, res) {
 //create event
 console.log('creating the event');
 console.log(req.session.user_id);
 console.log(req.body.name, req.body.date, req.body.type);
  return models.Event.create({
    recipient_name: req.body.name,
    event_date: req.body.date,
    event_type: req.body.type,
    user_id: userId
  })
  // connect the .create to this .then
  .then(function(eventcreated) {
    console.log('creating the association')
    console.log(eventcreated.user_id);
    return eventcreated.addUser(eventcreated.user_id).then(res.redirect('/events'));
  });
});
router.get('/signout', function(req,res){
  userId=0;
  res.render('./users/sign_in');
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
