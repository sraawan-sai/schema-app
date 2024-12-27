const express = require("express");
const router = express.Router();
const User = require("../models/users");
const userRouter = router;

// get All users
userRouter.get("/", async (req, res) => {
  const user = await User.find();

  if (!user) return res.status(404).json("user data not fond");

  res.status(200).send(user);
});

// DELETE user by ID
userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      return res
        .status(200)
        .json({ success: true, message: "The user has been deleted" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});
module.exports = userRouter;
