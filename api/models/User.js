const mongoose = require("mongoose");

const UserScehema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    address: {
      type: Array,
      default: [],
    },
    favorites: {
      type: Array,
      default: [],
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserScehema);
