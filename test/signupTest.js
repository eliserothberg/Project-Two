'use strict';

var Nightmare = require('nightmare');
var should = require('chai').should();




describe('eMinder', function() {
  this.timeout(10000);
// it('should log in', function(done) {
//     var nightmare = new Nightmare({
//       show: true
//     });
//   nightmare
//   // Visit login page
//   .goto('https://pure-scrubland-84099.herokuapp.com//users/sign-in')
//   // Enter username 
//   .type('#item', 'bob@gmail.com') 
//   // Enter password 
//   .type('#pass', 'bob')
//   // Take a screenshot of the login form.
//   .screenshot('login.png')
//   // Click login button. Always check if you've done this where necesssary!
//   //   It's easy to forget.
//   .click('#submit')
//   // Wait until the element containing videos I can select is rendered
//   // .wait('div.course-list-alt')
//   // // Scroll down a few hundred pixels.
//   // .scrollTo(500, 0)
//   // // Take a screenshot and save it to the current directory.
//   // .screenshot('eventScreen.png')
//   // // Make sure there's more than one video to choose from.
//   // .evaluate(function () {
//   //    return document.querySelectorAll('div#form-group.aname').length;
//   // })
//   // 
//   .end()

// });
  it('should go to log in page', function(done) {
    var nightmare = new Nightmare({
      show: true
    });
    var login = '#logging';
    nightmare
      .goto('https://pure-scrubland-84099.herokuapp.com/users/sign-in/')
      .wait(login)
      .click(login)
      // .wait('a[href*="/users/sign-in"]')
      .evaluate(function() {
        return document.title;
      })
      .end()
      .then(function(result) {
        result.should.equal('Log in to eMinder');
        done();
      })
      .catch(function(err) {
        console.error("Go to log in not working");
      });
  });

  it('should present events page after login', function(done) {
    var nightmare = new Nightmare({
      show: true
    });
    var login = '#logging';
    nightmare
      .goto('https://pure-scrubland-84099.herokuapp.com/users/sign-in/')
      .wait('a[href*="https://pure-scrubland-84099.herokuapp.com/users/sign-in/"]')
      .click('a[href*="https://pure-scrubland-84099.herokuapp.com/users/sign-in/"]')
      .wait('#em_login')
      .type('#em_login', 'bob@gmail.com')
      .type('#pass_login', 'bob')
      .click('#submit_login')
      // .wait('div#form-group.aname')
      // .evaluate(function() {
      //   return document.querySelectorAll('div#form-group.aname').length;
      // })
      .end()
      .then(function(result) {
        result.should.equal('Signed in');
        done();
      })
      // .then(function(count) {
      //   count.should.be.above(1);
      //   done();
      // })
      .catch(function(err) {
        console.error("Log in not working");
      });
  });

  // it('should ', function () {
  //   throw new Error('Failed on purpose, just to make the Mocha output more interesting.');
  // });
});
