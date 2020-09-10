const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({deleted: false}); //filters out soft deleted users
    // const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

//Fetch a specific user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//Post a new user
router.post("/", async (req, res) => {
  const user = new User(req.body);

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});

//Update a user
router.patch("/:id", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a user
router.delete("/:id", async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.id });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
