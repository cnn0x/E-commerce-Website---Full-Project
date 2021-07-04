const router = require("express").Router();
const User = require("../models/User");

//get a user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add a adress
router.put("/:userId/add-address", async (req, res) => {
  const user = User.findById(req.params.userId);
  try {
    const addedAddress = await user.updateOne({ $push: { address: req.body } });
    res.status(200).json(addedAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
