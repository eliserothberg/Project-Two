eMinder

When you need to remember...
and you can't remember shit.

Never again feel that awful amalgamation of dread, guilt, and self-loathing because you forgot to get a gift for an important event!
With a little input from you, we’ll make sure you remember to get that special gift- at the best price on the web- before the big day.

  Sign up and sign in securely with password protection that uses bcrypt with a 10-round salt.
  
  Create an event for which you want reminders and enter a specific gift or a category. 

  If a category is entered, you will be presented with a choice of popular gifts generated using a custom API.
 
  Once a selection has been made, our custom API also searches sites for the best price of the item you’ve chosen.

  An email will be sent to you on your requested date to remind you of your upcoming event(s). Additionally, if requested, another email will be sent once a day with the gift being tracked, the best web price for that option, a picture, and a link to the retailer.

  Your credit card information is secure because you never need to enter it to use the app.

UNDER THE HOOD:

eMInder uses ````Sequelize```` within an ````Express```` application, and is deployed through ````Heroku```` and utilizes ```MySQL``` and a Sequelize ORM with the Heroku add on ```JAWSBD``` as well as Heroku's ```Scheduler```.

We utilize the following dependencies:

- ````bcryptjs````
- ````body-parser````
- ````chai````
- ````cookie-parser````
- ````debug````
- ````express````
- ````express-handlebars````
- ````express-session````
- ````handlebars-dateformat````
- ````method-override````
- ````mocha````
- ````morgan````
- ````mysql````
- ````nightmare````
- ````nodemailer````
- ````nodemailer-express-handlebars````
- ````sequelize````
- ````sequelize-cli````