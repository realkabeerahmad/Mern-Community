// bcrypt-nodejs used for Password Encription and Decription
const bcrypt = require("bcrypt-nodejs");

// to Read Enviorment Variables
const dotenv = require("dotenv");

// Express JS used to create Routes
const express = require("express");

// User Model Created using MongoDB
const User = require("../models/user");

// Using Router from Express JS to create exportable routes
const router = express.Router();

// Setting Up Envionment Variables
dotenv.config();

// Register route for Creating a new user
router.post("/create", (req, res) => {
  // Getting all required data from request body
  var { firstName, lastName, email, password } = req.body;
  // Generating Salt using genSaltSync function with 10 rounds
  const salt = bcrypt.genSaltSync(10);
  // Check if email already exist in DB
  try {
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        res.json({ status: "failed", message: "User Already Exist" });
      } else if (err) {
        res.json({ status: "failed", message: "Server Error" });
      } else {
        // Creating a user object to save in database
        const user = new User({
          name: firstName + " " + lastName,
          email,
          password,
          Image: "https://i.ibb.co/Lk9vMV2/newUser.png",
        });
        // Hashing users password
        bcrypt.hash(user.password, salt, null, async (err, hash) => {
          if (err) {
            throw Error(err.message);
          }
          // Storing HASH Password in user object
          user.password = hash;
          // Storing user in our Database
          await user
            .save()
            .then(() => {
              // SendOtpVerificationEmail(result, res);
              res.send({ status: "success", message: "User Created" });
            })
            .catch(() => {
              res.json({ status: "failed", message: "Unable to Registered" });
            });
        });
      }
    });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
});

// Show User route
router.get("/read:_id", (req, res) => {
  const { _id } = req.params;
  try {
    User.findById({ _id }, (err, user) => {
      if (user) {
        res.status(200).send({
          status: "success",
          message: "User updated successfully",
          user: user,
        });
      } else {
        res.status(200).send({
          status: "failed",
          message: "User not updated",
        });
      }
    });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
});

// Delete User route
router.delete("/delete:_id", (req, res) => {
  const { _id } = req.params;
  try {
    User.findByIdAndDelete({ _id }, (err, user) => {
      if (user) {
        res.status(200).send({
          status: "success",
          message: "User deleted successfully",
          user: user,
        });
      } else {
        res.status(200).send({
          status: "failed",
          message: "User not updated",
        });
      }
    });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
});

// Show All Users route
router.get("/view/all", (req, res) => {
  try {
    User.find({}, (err, users) => {
      if (users) {
        res.status(200).send({
          status: "success",
          message: "All Users sent successfully",
          users: users,
        });
      } else {
        res.status(200).send({
          status: "failed",
          message: "User not updated",
        });
      }
    });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
});

// Login route to allow registered users to login
router.post("/login", (req, res) => {
  // Getting all required data from request body
  const { email, password } = req.body;
  // Checking if User exist
  try {
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        const validPassword = bcrypt.compareSync(password, user.password);
        if (validPassword) {
          res.send({
            status: "success",
            message: "Valid Password",
            user: user,
          });
        } else {
          res.send({
            status: "failed",
            message: "Invalid Password",
            user: user,
          });
        }
      } else {
        res.send({ status: "failed", message: "User do not Exist" });
      }
    });
  } catch (error) {
    res.json({ status: "failed", error: error.message });
  }
});

// Expoting Routes
module.exports = router;
