const mongoose = require('mongoose'); // Importing the Mongoose library
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const { Schema } = mongoose; // Destructuring to extract the schema object

// Defining a new Mongoose schema for the User model
const userSchema = new Schema({
  name: { type: String },  
  email: { type: String, required: true, unique: true },
  googleId: { type: String },
  facebookId: { type: String },
});

// Apply passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(findOrCreate);

// Creating a Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
