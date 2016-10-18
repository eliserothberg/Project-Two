'use strict';

var Nightmare = require('nightmare'),
    should = require('chai').should();

describe('foobar', function () {

  var login = 'a[href*="https://pure-scrubland-84099.herokuapp.com/users/sign-in"]';

  // it('need to log in', function () {
  //   // ID for the login button.

  //   Nightmare({ show : true })
  //   //goes to this site:
  //     .goto('https://pure-scrubland-84099.herokuapp.com/')
  //     // Just to be safe.
  //     .wait(login)
  //     // Click the login button.
  //     .click(login)
  //     // Assert the title is as expected.
  //     .evaluate(function () { 
  //       document.title.should.equal('E-minder');
  //     });
  // });

  it('now logging in', function () {

    Nightmare()
      .goto('https://pure-scrubland-84099.herokuapp.com/')
      // Just to be safe.
      .wait(login)
      // Click the login button.
      .click(login)
      // Assert the title is as expected.
      .evaluate(function () { 
        document.title.should.equal('E-minder');
      })
      // Actually log in
      .type('#em_login', 'bob@gmail.com')
      .type('#pass_pass', 'bob')
      .click('#login_submit')
      // Make sure there are multiple courses
      .evaluate(function () {
        return document.querySelectorAll('logged in');
      })
      .then(function (h1) {
        h1.should.equal('Gift tracking and Reminders')
      });
  });

  // it('should ', function () {
  //   throw new Error('Failed on purpose, just to make the Mocha output more interesting.');
  // });


 it('signing up', function () {
    var signup = 'a[href*="https://pure-scrubland-84099.herokuapp.com/users/new"]';

    Nightmare()
      .goto('https://pure-scrubland-84099.herokuapp.com/')
      // Just to be safe.
      .wait(signup)
      // Click the login button.
      .click(signup)
      // Assert the title is as expected.
      .evaluate(function () { 
        document.title.should.equal('E-minder');
      })
      // Actually log in
      .type('#un_signup', 'Bob')
      .type('#signup', 'bob@gmail.com')
      .type('#pass_pass', 'bob')
      .click('#submit_signup')
      // Make sure there are multiple courses
      .evaluate(function () {
        return document.querySelectorAll('signed up and logged in');
      })
      .then(function (h1) {
        // document.title.should.equal('E-minder');
        h1.should.equal('Gift tracking and Reminders')
      });
  });

  // it('should ', function () {
  //   throw new Error('Failed on purpose, just to make the Mocha output more interesting.');
  // });

});
