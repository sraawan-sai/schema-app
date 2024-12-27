const express = require('express');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const User = require('../models/users'); // Ensure correct path
const signinRouter = express.Router();
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = new twilio(accountSid, authToken);

// Verify OTP and Sign-In
signinRouter.post('/', async (req, res) => {
  const { phonenumber, code } = req.body;

  try {
    // Verify OTP
    const verificationCheck = await client.verify.services(serviceSid)
      .verificationChecks
      .create({ to: `+${phonenumber}`, code });

    if (verificationCheck.status !== 'approved') {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Find user by phone number
    const user = await User.findOne({ phonenumber });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to sign in', error: error.message });
  }
});

module.exports = signinRouter;
