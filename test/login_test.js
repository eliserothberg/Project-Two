var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })

should = require('chai').should();

nightmare
  .goto('https://pure-scrubland-84099.herokuapp.com/')//nightmare allows us to put a URL
  
  .click('#myBtn2')//then click it
  .wait('.window')//wait for .window to load
  .type('#em', 'montalvocode@yahoo.com')
  .type('#pass', 'password')
  .click('.button_base.b05_3d_roll')
  .wait('.create-update-form')//wait for .create-update-form to load
  //this line says in the URL above in the form with an action  /search, type 'github nightmare'. So it searches for it.
  .evaluate(function () {
    return document.title;
    
  })
  .end()
  .then(function (result) { //this is the result data for that data
    result.should.equal('E-Mider');
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });

//run node example.js

//What we accomplish is to be able to do functional testing. 



// 'use strict';

// var Nightmare = require('nightmare'),
//     should = require('chai').should(),
//     nightmare = Nightmare({ show: true });

// // STORY: As a developer nerd, I want to be able to log in to a dashboard of workshops.
// nightmare
//   // Visit login page

//   .goto('https://pure-scrubland-84099.herokuapp.com/users/sign-in/')

//   .goto('http://localhost:3000/users/sign-in')

//   // Enter username 
//   .type('#em', 'bob@gmail.com') 
//   // Enter password 
//   .type('#pass', 'bob')
//   // Take a screenshot of the login form.
//   .screenshot('login.png')
//   // Click login button. Always check if you've done this where necesssary!
//   //   It's easy to forget.
//   .click('#submit')
  
//   // .wait('??')
//   // // Scroll down a few hundred pixels.
//   // .scrollTo(500, 0)
//   // // Take a screenshot and save it to the current directory.
//   // .screenshot('eventScreen.png')
//   // .evaluate(function () {
//   //    return document.querySelectorAll('div#form-group.aname').length;
//   // })
//   // 
//   .end()
//   // .then(function (workshops) { 
//   //   what??.should.be.what??(??);
//   // })
