'use strict';
console.log('*** email_controller');

var models  = require('../models');
var express = require('express');

var app = express();
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var nodemailer = require('nodemailer');
//reference the plugin 

var hbs = require('nodemailer-express-handlebars');

var options = {//the plugin options
       viewEngine: {
           extname: '.hbs',
           layoutsDir: 'views/email/',
           defaultLayout : 'template',
           partialsDir : 'views/email/partialsDaily/'
       },
       viewPath: 'views/email/',
       extName: '.hbs'
    };

var exports = module.exports = {};

exports.dailyEmail = function (req, res) {
    console.log('I am the daily email export');
    return models.User.findAll({
      include:[ models.Event]
    })  
  .then(function(forgetful){
    // console.log(forgetful.length);
    // console.log('THIS IS FORGETFUL ' + JSON.stringify(forgetful[0]), null, 2);

    var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: 'uclaProject2@gmail.com',
              pass: 'superpassword'
          } 
      });

    //attach the plugin to the nodemailer transporter 
    transporter.use('compile', hbs(options));


     for(var i = 0; i < forgetful.length; i++){
        var user = forgetful[i];
        
        var mailOptions = {
            from: '"eMinder" <uclaProject2@gmail.com>',
            to: user.email,
            subject: "Your daily eMinder!",
            template: 'email_body_Daily',
            context: {
              user: user
            }
        };

        console.log(mailOptions);


        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                // res.redirect('/');
            }else {
                console.log('Message sent: ' + info.response);
                // res.redirect('/');
            }
        });
      } 
  })
};

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
          console.log(events[i].recipient_name,events[i].event_type);
          console.log('');
          // Need to update the email_sent boolean here.
        }
    }
  });
  console.log('leaving the sendEmails function');
   return true;
}

