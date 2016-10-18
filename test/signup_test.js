'use strict';

var Nightmare = require('nightmare');
var should = require('chai').should();




describe('eMinder', function() {
  this.timeout(10000);

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
      .wait('#em_logging')
      .type('#em_logging', 'bob@gmail.com')
      .type('#pass_logging', 'bob')
      .click('#submit_logging')
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
});
