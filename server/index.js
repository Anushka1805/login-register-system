//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/lgn-rg", {useNewUrlParser: true});


const userSchema = new mongoose.Schema({
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
    required: true
  }
});

const User = mongoose.model('User', userSchema);




//name.save()
//  .then(() => {
//    res.redirect("/");
    // Save operation successful
//  })
//  .catch((error) => {
//    console.log(error);
    // Handle the error
//  });



app.get("/home", async (req, res) => {
	res.send("This is the data for the home page")
});







// Register route
app.post('/register',cors(), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
app.post('/login',cors(), (req, res) => {
  // Retrieve email and password from the request body
  const { email, password } = req.body;

  // Find the user in the database based on the email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        // User not found
        return res.status(404).json({ error: 'User not found' });
      }

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // Passwords match, generate login response
            const username = user.name;
            res.send({ success: true, username });
          } else {
            // Passwords do not match
            return res.status(400).json({ error: 'Invalid password' });
          }
        });
    })
    .catch(error => {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    });
});



  
app.listen(8000, function() {
    console.log("Server started on port 8000");
  });