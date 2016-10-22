var Nightmare = require('nightmare');
var should = require('chai').should();

describe('Registered user logs in, gets taken to events page', function() {
  this.timeout(60000);

  it('should go to log in page', function(done) {
    var nightmare = new Nightmare({
      show: true
    });
    nightmare
      .goto('https://pure-scrubland-84099.herokuapp.com')
      .wait()
      .click('#myBtn2')
      // .wait('a[href*="/users/sign-in"]')
      .evaluate(function() {
        return document.title;
      })
      .end()
      .then(function(result) {
        result.should.equal('eMinder');
        done();
      })
      .catch(function(err) {
        console.error("Go to log in not working");
        done(err);
      });
  });

  it('should go to events page after login', function(done) {
    var nightmare = new Nightmare({
      show: true
    });
    nightmare
      .goto('https://pure-scrubland-84099.herokuapp.com/users/sign-in')
      .wait('a[href*="/users/sign-in"]')
      .click('a[href*="/users/sign-in"]')
      .wait('#em')
      .type('#em', 'bob@gmail.com')
      .type('#pass', 'bob')
      .click('.button_base.b05_3d_roll')
      .wait("#welBann")
      .evaluate(function() {
        return document.querySelectorAll('div#welBann')[0].innerText;
      })
      .end()
      .then(function(result) {
        result.should.contain('Welcome');
        done();
      })
      .catch(function(err) {
        console.error("Log in not working");
        done(err);
      });
  });
});