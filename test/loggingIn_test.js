'use strict';

var Nightmare = require('nightmare'),
    should = require('chai').should();

describe('fubar', function () {

  var login = '#regUser';

  it('logging in as existing user', function () {

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
      .type('input[id="em"]', 'bob@gmail.com')
      .type('input[id="pass"]', 'bob')
      .click('input[id="signIn"]')
      // Make sure there are multiple courses
      .evaluate(function () {
        return document.querySelectorAll('logged in');
      })
      // .then(function (text somehow- not sure what to reference if anything?) {
      //   text.should.equal('Gift tracking and Reminders')
      // });
  });

  // it('should ', function () {
  //   throw new Error('Failed on purpose, just to make the Mocha output more interesting.');
  // });


 it('signing up but already signed up', function () {
    var signingup = 'a[href*="https://pure-scrubland-84099.herokuapp.com/users/new"]';

    Nightmare()
    
      .goto('https://pure-scrubland-84099.herokuapp.com/')
      // Just to be safe.
      .wait(signingup)
      // Click the login button.
      .click(signingup)
      // Assert the title is as expected.
      .evaluate(function () { 
        document.title.should.equal('E-minder');
      })
      // Actually log in
      .type('input[id="un"]', 'Bob')
      .type('input[id="em"]', 'bob@gmail.com')
      .type('input[id="pass"]', 'bob')
      .click('input[id="signup"]')
      // Make sure there are multiple courses
      .evaluate(function () {
        return document.querySelectorAll('signed up and logged in');
      })
      // .then(function (?) {
      //   // document.title.should.equal('E-minder');
      //   ?.should.equal('?')
      // });
  });

});
