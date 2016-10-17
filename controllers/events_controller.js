var models  = require('../models');
var express = require('express');
var router  = express.Router();
var eventArray = [];
var userId=0;
var sessionId="";
var loggedIn=false;
var email="";
var counter=0;
var giftArray=[];
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
    console.log('returned the user');
    console.log(req.session.user_id);
    if (req.session.user_id==undefined){
      console.log('got to the error area');
      res.render('./users/sign_in');
    }else {
      userId=req.session.user_id;
      sessionId=req.sessionId;
      loggedIn=true;
      email=req.session.email;
    }
  return models.User.findOne({
    where:{
      id:userId
    }
  })
  .then(function(user) {
    return user.getEvents();
  }).then(function(events){
    console.log('in the events');
    console.log(events);
    counter=0;
    giftArray=[];
    // clear event array
    eventArray=[];
    var doThey=false;
    console.log('In yet again');
    console.log(events.length);
    console.log("* * * just before render -events controller");
    if (events.length>0){
        return findAssoc(events)
        .then(function(assoc){
          for (var j=0;j<events.length;j++){
            eventArray[j]=events[j].dataValues;
            eventArray[j].gift_name=giftArray[j].gift_name;
            eventArray[j].max_price=giftArray[j].max_price;
            if (giftArray[j].purchased){
              eventArray[j].purchased='Yes';
            }else {
              eventArray[j].purchased='No';
            }
          console.log('eventArray '+j);
          console.log(eventArray[j].max_price);
          }
          if (eventArray.length>0){doThey=true};
          res.render('./gifts/index', {
            eventdisp:eventArray,
            username:sessionId,
            logged_in: loggedIn,
            eventsExist:doThey,
            id:userId
          });
       });
      }else{
          res.render('./gifts/index', {
            eventdisp:eventArray,
            username:sessionId,
            logged_in: loggedIn,
            eventsExist:doThey,
            id:userId
          });
      }
  });
});

router.post('/create', function (req, res) {
  var newEvent={};
  // console.log('creating the event');
  // console.log(req.body.gift);
  // console.log(req.body.maxprice);
  // console.log(req.body.purchased);
 //create event
  return models.Event.create({
    recipient_name: req.body.name,
    event_date: req.body.date,
    event_type: req.body.type,
    user_id: userId
  })
  .then(function(eventcreated) {
    newEvent=eventcreated;
    // console.log('creating the association')
    // console.log(newEvent);
    return eventcreated.addUser(eventcreated.user_id);
  })
  .then(function(eventassoc){
    // console.log('the event association');
    // console.log(eventassoc);
    var bought=false;
    if (req.body.purchased=="purchased") {bought=true};
    if (req.body.maxprice=='') {req.body.maxprice=0};
    return models.Gift.create({
      gift_name:req.body.gift,
      max_price:req.body.maxprice,
      purchased:bought
    });
  })
  .then(function(giftcreated){
    // console.log('creating the gift association');
    // console.log(giftcreated)
    // console.log('here is the event id');
    // console.log(newEvent.id);
    return giftcreated.addEvent(newEvent.id).then (res.redirect('/events'));
  })
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
// Recursive function to step thru burger array, find associations and return an array
// of customers associated with the id of the burger. This will render the name of the
// last customer to eat the burger when the burger appears in the 'Burgers eaten' 
// section of the website.
function findAssoc(array){
  console.log('got to the top of findAssoc');
  // if all burgers have been processed, exit recursion
  if (counter<array.length){
    // find burger with the id of 'counter' in the table
    return models.Event.findOne({where: {id:array[counter].id}})
      .then (function(search){
        // console.log('returned from the search');
        // console.log(search.recipient_name);
        // get associated customers (sequelize created command)
        return search.getGifts()
          .then(function(returned){
            // console.log('returned with gifts');
            if (returned !='') {
              // console.log('got something');
              // var someArray=returned[0]['gift_name'];
              // console.log(returned[0].gift_name);
            }
            // console.log(gifts.dataValues.gift_name, gifts.dataValues.max_price, gifts.dataValues.purchased);
            // increment counter, push customer's name to associativity array
            // if the customer name string is empty (user has hit the 'Devour It!'
            // button without entering a name), add "No One" as the last eater
            counter+=1;
            if (returned==''){
                var objToPush ={
                  gift_name:'none',
                  max_price:'N/A',
                  purchased:false
                };
                // console.log('pushing nothing');
                // console.log(objToPush);
                giftArray.push(objToPush);
              } else {
                var objToPush = {
                  gift_name:returned[0].gift_name,
                  max_price:returned[0].max_price,
                  purchased:returned[0].purchased
                };
                // console.log('pushing something');
                // console.log(objToPush);
                giftArray.push(objToPush);
              }
            // recursively call the array with the burgers array passed in on
            // initial call
            return findAssoc(array);
          });
      });
  } else {
    // processing done - return the associativity array
    return giftArray;
    
  }
}


module.exports = router;
