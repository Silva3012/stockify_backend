require('dotenv').config();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const User = require('../models/user');


// Serialize user object for session storage
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, {
      id: user.id,
      email: user.email,
      name: user.name,
    });
  });
});

// Deserialize user object
passport.deserializeUser((user, done) => {
  done(null, user);
});

// // Facebook strategy for authentication
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: 'http://localhost:3001/api/users/auth/facebook/stockify',
//       profileFields: ['id', 'displayName', 'email'],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const facebookId = profile.id;
//         let user = await User.findOrCreate(
//           { facebookId }, // Search for existing user with the Facebook ID
//           {
//             email: profile.emails[0]?.value,
//             name: profile.displayName,
//             facebookId, // Store the Facebook ID in the user document
//           }
//         );

//         // Generate the JWT token
//         const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         // Console log the token
//         console.log('Facebook token:', token);

//         // Pass the token to the callback
//         return done(null, { user, token });
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

// Google strategy for authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/users/auth/google/stockify',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        let user = await User.findOrCreate(
          { googleId }, // Search for existing user with the Google ID
          {
            _id: new mongoose.Types.ObjectId(),
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId, // Store the Google ID in the user document
          }
        );

        // Generate the JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Console log the token
        console.log('Google token:', token);
        console.log(user._id);

        return done(null, { user, token});
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
