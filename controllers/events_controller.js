var models  = require('../models');
var express = require('express');
var router  = express.Router();
var daily = require('../bin/scheduleEmail.js');
var eventArray = [];
var userId=0;
var username='';
var loggedIn=false;
var email="";
var giftArray=[];
// on initialization call function to check if email
// notifications should be sent
sendEmails();
// Display the events page
router.get('/', function(req, res) {
  var holder=[];
  // if session id defined, then set parameters to display events
  if (req.session.user_id != undefined) {
    userId=req.session.user_id;
    username=req.session.username;
    loggedIn=true;
    email=req.session.email;
  };
  // if userId is undefined - user may have refreshed the page
  // after the server.js was stopped and then started, so 
  // redirect to sign in.
  // if userId is 0, the user is entering the page before
  // logging in, so redirect so sign in.
  if (userId==undefined || userId==0){
    res.render('./users/sign_in');
  }
  // user is logged in, access user information
  return models.User.findOne({
    where:{
      id:userId
    }
  })
  // get events associated with user
  .then(function(user) {
    return user.getEvents();
  }).then(function(events){
    // arrays that contain gifts and events
    giftArray=[];
    eventArray=[];
    // set default value for event existance (i.e. no events exist)
    var doThey=false;
    // if events exist, find associated gifts
    if (events.length>0){
        // function to return gifts associated with events
        return findAssoc(events)
        .then(function(assoc){
          //Loop thru returned events and assign values for display
          for (var j=0;j<events.length;j++){
            eventArray[j]=events[j].dataValues;
            eventArray[j].gift_name=giftArray[j].gift_name;
            eventArray[j].max_price=giftArray[j].max_price;
            // changed purchased from boolean value to 'yes' of 'no'
            if (giftArray[j].purchased){
              eventArray[j].purchased='Yes';
            }else {
              eventArray[j].purchased='No';
            }
          }
          // reset doThey if events exist
          if (eventArray.length>0){doThey=true};
          // render the events page 
          res.render('./gifts/index', {
            eventdisp:eventArray,
            username:username,
            logged_in: loggedIn,
            eventsExist:doThey,
            id:userId
          });
       });
      }else{
          // render the gifts page if there are no events
          res.render('./gifts/index', {
            eventdisp:eventArray,
            username:username,
            logged_in: loggedIn,
            eventsExist:doThey,
            id:userId
          });
      }
  });
});

// Create a new Event
router.post('/create', function (req, res) {
  var newEvent={};
  //create event with values passed from the index page
  return models.Event.create({
    recipient_name: req.body.name,
    event_date: req.body.date,
    event_type: req.body.type,
    user_id: userId,
    notify_date:req.body.datenote,
    email_sent:false
  })
  // create associated gift with values from index page
  .then(function(event){
    var eventId=event.id;
    var bought=false;
    if (req.body.purchased=="purchased") {bought=true};
    if (req.body.maxprice=='') {req.body.maxprice=0};
    return models.Gift.create({
      gift_name:req.body.gift,
      max_price:req.body.maxprice,
      purchased:bought,
      user_id:userId,
      event_id:eventId
    });
  })
  // refresh the events page to show new event
  .then (function() {
    res.redirect('/events');
  });
});

//sign user out & return to sign in page
router.get('/signout', function(req,res){
  userId=0;
  res.render('./users/sign_in');
});
// delete an event and associated gift
router.post('/delete/:id', function(req,res) {
  // delete event
  return models.Event.destroy({
    where: {
      id:req.params.id
    }
  })
  .then (function(giftToDel){
    // delete gift
    return models.Gift.destroy({
      where:{
        event_id:req.params.id
      }
    })
    // refresh the events page
    .then(function(){
      res.redirect('/events');
    })
  });
});
// delete user account
router.post('/deleteaccount/', function(req,res) {
  //Delete event based on the id passed in the url
  if (userId==undefined || userId==0) {
    res.redirect('/');
  } else {
    models.User.destroy({
      where: {
        id: userId
      }
    })
    // redirect back to home page
    .then(function() {
      res.redirect('/');
    });
  }
});

// Function to find all gifts associated with passed events array
function findAssoc(array){
  console.log('got to the top of findAssoc');
    // find event with the id of 0 in the table
    return models.Event.findOne({where: {id:array[0].id}})
      .then (function(search){
        // get associated gifts 
        return models.Gift.findAll({
          where:{user_id:search.user_id}
        })
          .then(function(returned){
            // Loop thru returned object, determine if a gift exists
            for (var i=0;i<returned.length;i++){
            if (returned[i].dataValues.gift_name==''){
              // gift does not exist - push default values to gift array
                var objToPush ={
                  gift_name:'none',
                  max_price:'N/A',
                  purchased:false
                };
                giftArray.push(objToPush);
              } else {
                // Gift exists push it's info to the gift array
                var objToPush = {
                  gift_name:returned[i].dataValues.gift_name,
                  max_price:returned[i].dataValues.max_price,
                  purchased:returned[i].dataValues.purchased
                };
                giftArray.push(objToPush);
              }
            }
            // return complete gift array
            return giftArray;
          });
      });
}

function sendEmails() {
  // find all events
  return models.Event.findAll({
    where:{}
  })
  .then(function(events){
    // Loop thru all events, determine if the notification date has passed
    for (var i=0;i<events.length;i++){
        var current=Date.now();
        var currentDate=new Date(current);
        var dateThen=new Date(events[i].notify_date);
        if (currentDate < dateThen){
          // the notify date has not passed yet - do nothing
        }
        if (currentDate >= dateThen && !events[i].email_sent){
            // send e-mail & update in the mySql database
            daily.dailyEmail();
            events[i].updateAttributes({
            email_sent:true
          });
        }
    }
  });
  return true;
}


module.exports = router;
