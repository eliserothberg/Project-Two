// var expect = require('chai').expect;
var should = require('chai').should;

var Login = require('../controllers/users_controller.js')
//should allow all registered users access to the site
describe('Login', function() {
	it('should allow user to enter their name'
	// 	, function(done) {
 //  	chai.request(server)
	//     .get('/')
	//     .end(function(err, res){
	//       res.should.have.status(200);
	//       done();
	//     });
	// }
	);  
	it('should allow returning user to enter their password');
  it('should allow returning user to submit information');
  it('should tell new user there is no record of them in the system');
  it('should redirect returning user to gift entry page');
});

var Register = require('../controllers/users_controller.js')
//should allow all registered users access to the site
describe('Register', function() {
	it('should allow new user to enter their name' 
	// 	, function(done) {
	//   chai.request(server)
	//     .get('/')
	//     .end(function(err, res){
	//       res.should.have.status(200);
	//       done();
	//     });
	// }
	);  
	it('should allow new user to enter their password');
  it('should allow new user to submit information');
  it('should redirect new user to gift entry page');
  it('should tell user we already have an email or username for this account if already registered')
  it('should redirect new user to gift entry page');

});

var hashPass = require('../controllers/users_controller.js')
//should allow all registered users access to the site
describe('hashPass', function() {
	it('should hash a user\'s password'
	// 	, function(done) {
	// 	var user = new User({email:'email@gmail.com', passwordHash:'override'})
	// 	user.save(function (err) {

	// 	})
 // //  	chai.request(server)
	// //     .get('/')
	// //     .end(function(err, res){
	// //       res.should.have.status(200);
	// //       done();
	// //     });
	// // }
	// }
	);  
});

var enterEvent = require('../controllers/events_controller.js')
//should allow all registered users access to the site
describe('enterEvent', function() {
	it('should allow user to enter a gift name'
		// , function(done) {
	 //  chai.request(server)
	 //    .get('/')
	 //    .end(function(err, res){
	 //      res.should.have.status(200);
	 //      done();
	 //    });
		// }
		);  
	it('should allow user to enter a recipient name');
  it('should allow user to enter a max price for the gift');
  it('should allow user to enter an event date');
});


var deleteEvent = require('../controllers/events_controller.js')
//should allow all registered users access to the site
describe('deleteEvent', function() {
	it('should allow user to delete event'
		// , function(done) {
	 //  chai.request(server)
	 //    .get('/')
	 //    .end(function(err, res){
	 //      res.should.have.status(200);
	 //      done();
	 //    });
		// }
	);  
});

var logOut = require('../controllers/events_controller.js')
//should allow all registered users access to the site
describe('logOut', function() {
	it('should allow user to end session'
		// , function(done) {
	 //  chai.request(server)
	 //    .get('/')
	 //    .end(function(err, res){
	 //      res.should.have.status(200);
	 //      done();
	 //    });
		// }
	);  
});

// var Gift = require('../models/gift.js')

// describe('?', function() {
// it('should ?', function(done) {
//   chai.request(server)
//     .get('/events')
//     .end(function(err, res){
//       res.should.have.status(200);
//       done();
//     });
// });  
// it('should ?? GET');
//   it('should ?? POST');
//   it('should ?? PUT');
//   it('should ?? DELETE');
// });

// var Letter = require('../lib/letter');

// describe("Letter", function() {
// 	it("is created with a letter", function() {
// 		var l = new Letter('g');
// 		expect(l.letter).to.equal('g');
// 	});

// 	it("is not guessed by default", function() {
// 		var l = new Letter('g');
// 		expect(l.guessed).to.equal(false);
// 	});

// 	describe('toString', function() {
// 		it("returns a placeholder if it is not guessed", function() {
// 			var l = new Letter('g');
// 			l.guessed = false;
// 			expect(l.toString()).to.equal('_');
// 		});

// 		it("returns the letter if it is guessed", function() {
// 			var l = new Letter('g');
// 			l.guessed = true;
// 			expect(l.toString()).to.equal('g');
// 		});
// 	});

// 	describe('guess', function() {
// 		it("sets the letter as guessed if it's the right letter", function() {
// 			var l = new Letter('g');
// 			l.guess('g');
// 			expect(l.guessed).to.equal(true);
// 		});

// 		it("does not set the letter as guessed for the wrong letter", function() {
// 			var l = new Letter('g');
// 			l.guess('a');
// 			expect(l.guessed).to.equal(false);
// 		});

// 		it("ignores the guess if the letter is already guessed", function() {
// 			var l = new Letter('g');
// 			l.guess('g');
// 			expect(l.guessed).to.equal(true);
// 			l.guess('a');
// 			expect(l.guessed).to.equal(true);
// 		})
// 	});
// })

