eMinder

When you need to remember...
and you can't remember shit.

Never again feel that awful amalgamation of dread, guilt, and self-loathing because you forgot to get a gift for an important event!
With a little input from you, we’ll make sure you remember to get that special gift- at the best price on the web- before the big day.

  Sign up and sign in securely with password protection that uses bcrypt with a 10-round salt.
  
  Create an event for which you want reminders and enter a specific gift or a category. 

  If a category is entered, you will be presented with a choice of popular gifts generated using a custom API.
 
  Once a selection has been made, our custom API also searches ```XXXXXX``` sites for the best price of the item you’ve chosen.

  An email, generated with ```XXXXX```, will be sent to you once a day with the event being tracked, the best web price for that option, a picture, and a link to the retailer. 

  Your credit card information is secure because you never need to enter it to use the app.

UNDER THE HOOD:

eMInder uses ````sequelize```` within an ````express```` application and is deployed through ````Heroku```` and utilizes ```MySQL``` with the add on ```JAWSBD``` as well as ```Heroku Scheduler```.

We utilize the following dependencies:

- ````bcryptjs````
- ````body-parser````
- ````cookie-parser````
- ````debug````
- ````express````
- ````express-handlebars````
- ````express-session````
- ````method-override````
- ````morgan````
- ````mysql````
- ````sequelize````
- ````sequelize-cli````
- ````mocha````
- ````chai````
- ````nightmare````





