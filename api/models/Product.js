const mongoose = require("mongoose");

const ProductScehema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    info: {
      type: Object,
      default: {},
      required: true,
    },
    ratings: {
      type: Array,
      default: [],
    },
    price: {
      type: Number,
      required: true,
    },
    previosPrice: {
      type: Number,
    },
    images: {
      type: Array,
      default: [],
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    favorites: {
      type: Array,
      default: [],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductScehema);
