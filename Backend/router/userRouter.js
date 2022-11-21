const express = require("express");
const { ObjectId } = require("mongodb");
const generateToken = require("../connection/generateToken");
const router = new express.Router();
const User = require("../models/userModel");
require("dotenv").config();


router.post("/register", async (req, res) => {
  try {
    const { name, email, password, cpassword } = req.body;
    const userExist = await User.findOne({ email: req.body.email });

    if (!name || !email || !password || !cpassword) {
      res.send("please fill all the fields");
    } else if (password != cpassword) {
      res.send("passwords do not match");
    } else if (userExist) {
      res.send("user already exist");
    } else {
      console.log(req.body);
      const user = new User(req.body);
      user
        .save()
        .then((result) => {
          // generating jwt token
          const token = generateToken(result);
          res.status(201).send({ "message": "sign up success", "token" : token });
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    }
  } catch (e) {
    res.status(404).send({ data: e });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const userEmail = await User.findOne({ email});

    if (userEmail && (await userEmail.matchPassword(password))) {
      console.log(userEmail._id);
      const token = generateToken(userEmail);
      res.status(201).send({ message: "login In success", token: token });
    } else {
      res.send("check your email or password");
    }
  } catch (e) {
    res.status(404).send({ data: e });
  }
});

module.exports = router;
