var models  = require('../models');
var express = require('express');
var router  = express.Router();
var daily = require('../bin/scheduleEmail.js');
var eventArray = [];
var userId=0;
var username='';
// var sessionId="";
var loggedIn=false;
var email="";
var counter=0;
var giftArray=[];
    console.log("****events_controller");
sendEmails();
router.get('/', function(req, res) {
  var holder=[];
  console.log('In the events controller');
  if (req.session.user_id != undefined) {
    userId=req.session.user_id;
    username=req.session.username;
    loggedIn=true;
    email=req.session.email;
  };
    if (userId==undefined || userId==0){
      res.render('./users/sign_in');
    }
  return models.User.findOne({
    where:{
      id:userId
    }
  })
  .then(function(user) {
    return user.getEvents();
  }).then(function(events){
    counter=0;
    giftArray=[];
    // clear event array
    eventArray=[];
    var doThey=false;
    console.log("* * * just before render -events controller");
    if (events.length>0){
        return findAssoc(events)
        .then(function(assoc){
          console.log('Back in the function');
          console.log(events.length);
          for (var j=0;j<events.length;j++){
            eventArray[j]=events[j].dataValues;
            console.log('in the loop');
            console.log(giftArray[j].gift_name);
            eventArray[j].gift_name=giftArray[j].gift_name;
            eventArray[j].max_price=giftArray[j].max_price;
            if (giftArray[j].purchased){
              eventArray[j].purchased='Yes';
            }else {
              eventArray[j].purchased='No';
            }
          }
          if (eventArray.length>0){doThey=true};
          console.log('about to render');
          res.render('./gifts/index', {
            eventdisp:eventArray,
            username:username,
            logged_in: loggedIn,
            eventsExist:doThey,
            id:userId
          });
       });
      }else{
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

router.post('/create', function (req, res) {
  var newEvent={};
 //create event
  return models.Event.create({
    recipient_name: req.body.name,
    event_date: req.body.date,
    event_type: req.body.type,
    user_id: userId,
    notify_date:req.body.datenote,
    email_sent:false
  })
  .then(function(event){
    console.log('the gift creation');
    var eventId=event.id;
    console.log(eventId);
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
  .then(function(giftcreated){
    return giftcreated.addEvent(newEvent.id);
  }).then (function() {
    res.redirect('/events');
  });
});

router.get('/signout', function(req,res){
  userId=0;
  res.render('./users/sign_in');
});

router.post('/delete/:id', function(req,res) {
  console.log(req.params.id);
  return models.Event.destroy({
    where: {
      id:req.params.id
    }
  })
  .then (function(giftToDel){
    return models.Gift.destroy({
      where:{
        event_id:req.params.id
      }
    })
    .then(function(){
      res.redirect('/events');
    })
  });
});

router.post('/deleteaccount/', function(req,res) {
  console.log('in the deleteaccount function');
  console.log(userId);
  // console.log(req);
  //Delete event based on the id passed in the url
  if (userId==undefined || userId==0) {
    res.redirect('/');
  } else {
    models.User.destroy({
      where: {
        id: userId
      }
    })
    .then(function() {
      res.redirect('/');
    });
  }
});
// Recursive function to step thru passed array, find associations and return an array
// of customers associated with the id of the burger. This will render the name of the
// last customer to eat the burger when the burger appears in the 'Burgers eaten' 
// section of the website.
function findAssoc(array){
  console.log('got to the top of findAssoc');
  // if all members of the array have been processed, exit recursion
  if (counter<array.length){
    // find burger with the id of 'counter' in the table
    return models.Event.findOne({where: {id:array[counter].id}})
      .then (function(search){
        // get associated customers (sequelize created command)
        return models.Gift.findAll({
          where:{user_id:search.user_id}
        })
          .then(function(returned){
            console.log('returned with gifts');
            // console.log(returned);
            if (returned !='') {
              console.log('got something');
              // var someArray=returned[0]['gift_name'];
              console.log(returned[0].gift_name);
            }
            // increment counter, push customer's name to associativity array
            // if the customer name string is empty (user has hit the 'Devour It!'
            // button without entering a name), add "No One" as the last eater
            counter+=1;
            for (var i=0;i<returned.length;i++){

            if (returned[i].dataValues.gift_name==''){
                var objToPush ={
                  gift_name:'none',
                  max_price:'N/A',
                  purchased:false
                };
                console.log('pushing nothing');
                // console.log(objToPush);
                giftArray.push(objToPush);
              } else {
                console.log('got a gift');
                console.log(returned[i].dataValues.gift_name);
                var objToPush = {
                  gift_name:returned[i].dataValues.gift_name,
                  max_price:returned[i].dataValues.max_price,
                  purchased:returned[i].dataValues.purchased
                };
                giftArray.push(objToPush);
              }
            }
            // initial call
            return giftArray;
          });
      });
  } else {
    // processing done - return the associativity array
    return giftArray;
    
  }
}
// var exports = module.exports = {};

function sendEmails() {
  console.log('in the sendEmails function');
  console.log('');
  return models.Event.findAll({
    where:{
    }
  })
  .then(function(events){
    for (var i=0;i<events.length;i++){
      console.log(events[i].recipient_name,events[i].event_date, events[i].notify_date, events[i].email_sent);
        var current=Date.now();
        var currentDate=new Date(current);
        var dateThen=new Date(events[i].notify_date);
        console.log(currentDate, dateThen);
        if (currentDate < dateThen){
          console.log('The current date is ealier than the notify date - no e-mail should be sent');
          console.log('');
        }
        if (currentDate >= dateThen && !events[i].email_sent){
          console.log('The current date is after or on the notify date, email should be sent for:');
          console.log(events[i].id,events[i].event_type);
          console.log('');
          daily.dailyEmail();
          events[i].updateAttributes({
            email_sent:true
          });
        }
    }
  });
  console.log('leaving the sendEmails function');
  return true;
}


module.exports = router;
