const mongoose = require('mongoose'); // Importing the Mongoose library
const findOrCreate = require('mongoose-findorcreate');
const { Schema } = mongoose; // Destructuring to extract the schema object

// Defining a new Mongoose schema for the User model
const userSchema = new Schema({
  name: { type: String },  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unqiue: true},
  googleId: { type: String },
  facebookId: { type: String },
  disabled: { type: Boolean, default: false },
});

// // Apply findOrCreate
userSchema.plugin(findOrCreate);

// Creating a Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Exporting the User model for use in other parts of the application
module.exports = User;
