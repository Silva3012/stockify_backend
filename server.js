require('dotenv').config(); 
const express = require('express'); // Importing the express module
const session = require('express-session'); // Importing express session middleware
const mongoose = require('mongoose'); // Importing Mongoose
const logger = require('morgan'); // To log on the termoinal
const passport = require('passport') // Importing passport
const userRoutes = require('./routes/userRoutes');

let PORT = 3000 || process.env.PORT 

const app = express() // Instance of express

// Add express-session middleware
app.use(session({
  secret: 'This here is my secret',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Connect to the DB with mongoose
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;