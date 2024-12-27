const express = require("express");
const twilio = require("twilio");
const User = require("../models/users");
const otpRouter = express.Router();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = new twilio(accountSid, authToken);

//const otpRouter = router

otpRouter.post("/", async (req, res) => {
  const { phonenumber } = req.body;

  try {
    const user = await User.findOne({ phonenumber });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Phone number not registered" });
    }
    const verify = await client.verify
      .services(serviceSid)
      .verifications.create({ to: `+${phonenumber}`, channel: "sms" });
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500)
      .json({
        success: false,
        message: "Failed to send OTP",
        error: error.message,
      });
  }
});

module.exports = otpRouter;