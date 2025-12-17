const passport = require("passport");
const person = require('./models/person')
const localstratagy = require('passport-local').Strategy;



passport.use(
  new localstratagy(async (Username, Password, done) => {
    try {
      console.log('credentials received', Username, password);

      const user = await person.findOne({username,Username });

      if (!user) {
        return done(null, false);
      }

      if (user.password !== Password) {
        return done(null, false);
      }else{
      return done(null, user);
    }
    } 
    
    catch (err) {
      return done(err);
    }
  })
);




module.exports = passport