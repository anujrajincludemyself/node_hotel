const passport = require("passport");
const person = require('./models/person')
const localstratagy = require('passport-local').Strategy;



passport.use(new localstratagy(async (username, password, done) => {
  try {
    // console.log('Received credentials:', username, password);

    const user = await person.findOne({ username });
    if (!user)
      return done(null, false, { message: 'Incorrect username.' });

    const isPasswordMatch = user.comparepassword(password);

    if (isPasswordMatch)
      return done(null, user);
    else
      return done(null, false, { message: 'Incorrect password.' });

  } catch (error) {
    return done(error);
  }
}));


module.exports = passport