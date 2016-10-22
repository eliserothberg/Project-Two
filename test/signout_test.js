'use strict';

var Nightmare = require('nightmare');
var should = require('chai').should();

describe('Sign out', function() {
  this.timeout(60000);

it('should allow user to sign out', function(done) {
    var nightmare = new Nightmare({
      show: true
    });
    nightmare
      .goto('https://pure-scrubland-84099.herokuapp.com/events')
      .wait('a[href*="/users/sign-out"]')
      .click('a[href*="/users/sign-out"]') 
      .wait('.shadow')
      .evaluate(function() {
        return document.querySelectorAll('.shadow')[0].innerText;
      })
      .end()
      .then(function(result) {
        result.should.contain('remember');
        done();
      })
      .catch(function(err) {
        console.error("Sign out not working");
        done(err);
      });
  });
});