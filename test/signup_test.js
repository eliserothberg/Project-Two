'use strict';

var Nightmare = require('nightmare');
var should = require('chai').should();

describe('eMinder', function() {
  this.timeout(10000);

  it('should go to log in page', function(done) {
    var nightmare = new Nightmare({
      show: true
    });
    // var login = 'input[id="regUser"]';
    nightmare
      .goto('https://pure-scrubland-84099.herokuapp.com')
      .wait('a[href*="/users/sign-in"]')
      .click('input[id="regUser" type="submit"]')
      // .click('input[type="submit"]')
      // .wait('a[href*="/users/sign-in"]')
      .evaluate(function() {
        return document.title;
      })
      .end()
      .then(function(result) {
        result.should.equal('Go to eMinder log-in page');
        done();
      })
      .catch(function(err) {
        console.error("Go to log-in test not working");
      });
  });

  it('should go to events page after login', function(done) {
    var nightmare = new Nightmare({
      show: true
    });
    // var login = '#logging';
    nightmare
      .goto('https://pure-scrubland-84099.herokuapp.com/users/sign-in/')
      .wait('a[href*="https://pure-scrubland-84099.herokuapp.com/users/sign-in/"]')
      .click('a[href*="https://pure-scrubland-84099.herokuapp.com/users/sign-in/"]')
      .wait('a[href*="/users/sign-in"]')
      .type('input[id="em"]', 'bob@gmail.com')
      .type('input[id="pass"]', 'bob')
      .click('input[id="newUser" type="submit"]')
      // .click('input[type="submit"]')
      // .wait('div#form-group.aname')
      .evaluate(function() {
        // return document.querySelectorAll('div#form-group.aname').length;
        console.log("foo");
      })
      .end()
      // .then(function(result) {
      //   result.should.equal('Signed in');
      .then(function() {
        console.log("bar");
        done();
      
      })
      // .then(function(count) {
      //   count.should.be.above(1);
      //   done();
      // })
      .catch(function(err) {
        console.error("Log in test not working at all");
      });
  });
});
