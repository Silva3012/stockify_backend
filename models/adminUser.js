const mongoose = require('mongoose'); // Importing the Mongoose library
const findOrCreate = require('mongoose-findorcreate');

const { Schema } = mongoose; // Destructuring to extract the schema object

const adminUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'admin',
  },
  permissions: {
    type: [String],
    default: ['getUsers', 'disableUser', 'viewPortfolio', 'viewWatchlist'],
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
    },
  ],
});

adminUserSchema.plugin(findOrCreate); // Applying the findOrCreate plugin to the schema

const AdminUser = mongoose.model('AdminUser', adminUserSchema); // Creating a Mongoose model for the AdminUser schema

module.exports = AdminUser; 
