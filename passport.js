require('dotenv').config();
const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');

// Use passport-local-mongoose strategy
passport.use(User.createStrategy({ usernameField: 'email' })); 

// Serialize user object for session storage
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// Serialize user object for session storage
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, {
      id: user.id,
      email: user.email,
      name: user.name
    });
  });
});

// Deserialize user object
passport.deserializeUser((user, done) => {
  done(null, user);
});

/* Facebok require an app review so I will omit this for now */

// Facebook strategy for authentication
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: 'http://localhost:3000/api/users/auth/facebook/stockify',
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

//         return done(null, user);
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
      callbackURL: 'http://localhost:3000/api/users/auth/google/stockify',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        let user = await User.findOrCreate(
          { googleId }, // Search for existing user with the Google ID
          {
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId, // Store the Google ID in the user document
          }
        );

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


module.exports = passport;
