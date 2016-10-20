'use strict';

var Nightmare = require('nightmare');
var should = require('chai').should();

describe('Try to sign up but told you are a registered user', function() {
  this.timeout(10000);
 
  it('should try to sign in as new user but already registered', function(done) {
    var nightmare = new Nightmare({
      show: true
    });
    nightmare
      .goto('https://pure-scrubland-84099.herokuapp.com/users/new')
      .wait('a[href*="/users/new"]')
      .click('a[href*="/users/new"]')
      .wait('#un')
      .type('#un', 'Bob')
      .type('#em', 'bob@gmail.com')
      .type('#pass', 'bob')
      .click('.button_base.b05_3d_roll')
      .wait('.occHead')
      .evaluate(function() {
        return document.querySelectorAll('.occHead')[0].innerText;  
      })
      .end()
      .then(function(result) {
        result.should.contain('Create');
        done();
      })
      .catch(function(err) {
        console.error("new user already registered not working");
        done(err);
      });
  });
});
