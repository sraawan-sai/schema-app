const express = require('express');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const User = require('../models/users'); // Ensure correct path
const signinRouter = express.Router();
require('dotenv').config();


const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = new twilio(accountSid, authToken);

// Verify OTP and Sign-In
signinRouter.post('/', async (req, res) => {
  const { phonenumber, code } = req.body;

  try {
<<<<<<< HEAD
    console.log('Received request to sign in with phone number:', phonenumber);
    // Verify OTP
    console.log('Verifying OTP...');
    const verificationCheck = await client.verify.services(serviceSid)
      .verificationChecks
      .create({ to: `+91${phonenumber}`, code });

console.log("verify",verificationCheck)
    if (verificationCheck.status !== 'approved') {
      console.log('OTP verification failed or expired');
=======
    // Verify OTP
    const verificationCheck = await client.verify.services(serviceSid)
      .verificationChecks
      .create({ to: `+${phonenumber}`, code });

    if (verificationCheck.status !== 'approved') {
>>>>>>> 5601935284a716225eb308138fec5382d091a6c1
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Find user by phone number
<<<<<<< HEAD
    console.log('Finding user by phone number in database...');
    const user = await User.findOne({ phonenumber });
    if (!user) {
      console.log('User not found');
=======
    const user = await User.findOne({ phonenumber });
    if (!user) {
>>>>>>> 5601935284a716225eb308138fec5382d091a6c1
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Generate JWT
<<<<<<< HEAD
    console.log('Generating JWT...');
    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('JWT generated:', token);
    res.status(200).json({ success: true, token });

  } catch (error) {
    console.error('Error during sign-in:', error);
    res.status(500).json({ success: false, message: 'Failed to sign in -local', error: error.message });
=======
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, token });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to sign in', error: error.message });
>>>>>>> 5601935284a716225eb308138fec5382d091a6c1
  }
});

module.exports = signinRouter;
