const express = require("express");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const signupRouter = router;

signupRouter.post("/", async (req, res) => {
  const {
    username,
    fullname,
    phonenumber,
    email,
    password,
    referralCode,
    role,
  } = req.body;

  if (!phonenumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  try {
    const userExists = await User.findOne({ phonenumber });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      fullname,
      phonenumber,
      email,
      password: hashedPassword,
      referralCode,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = signupRouter;
