'use strict';

var Nightmare = require('nightmare');
var should = require('chai').should();

describe('Email test', function() {
  this.timeout(10000);
  it('checks if user can enter an email', function(done) {
    var nightmare = new Nightmare({
      show: true
    });
    nightmare
    .goto('https://pure-scrubland-84099.herokuapp.com/')//nightmare allows us to put a URL
    .click('#myBtn2')//then click it
    .wait('.window')//wait for .window to load
    .type('#em', 'montalvocode@yahoo.com')
    .type('#pass', 'password')
    .click('.button_base.b05_3d_roll')
    .wait('.create-update-form')//wait for .create-update-form to load
    //this line says in the URL above in the form with an action  /search, type 'github nightmare'. So it searches for it.  .evaluate(function () {
      .evaluate(function() {
        return document.title;
    })
    .end()
    .then(function (result) { //this is the result data for that data
      result.should.equal('E-Minder');
      console.log(result);
      done();
    })
    .catch(function (error) {
      console.error('Search failed:', error);
      done(error);
    });
  });
});
