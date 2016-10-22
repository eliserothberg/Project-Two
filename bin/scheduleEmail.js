
'use strict';

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
		       partialsDir : 'views/email/partialsDaily/',
		       helpers: {
		       dateFormat: require('handlebars-dateformat')}
		   },
		   viewPath: 'views/email/',
		   extName: '.hbs'
		};

var exports = module.exports = {};

exports.dailyEmail = function (req, res) {
    return models.User.findAll({
    	include:[ models.Event]
    })  
	.then(function(forgetful){

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
	    	if (forgetful[i].dataValues.Events!=''){
	    		console.log('i would have sent the e-mail');
		    	// transporter.sendMail(mailOptions, function(error, info){
			    //     if(error){
			    //         console.log(error);
			    //         // res.redirect('/');
			    //     }else {
			    //         console.log('Message sent: ' + info.response);
			    //         // res.redirect('/');
			    //     }
			    // });
	    	}


		} 

    })
};

