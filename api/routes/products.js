const router = require("express").Router();
const User = require("../models/User");
const Product = require("../models/Product");

//add a product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a product
router.delete("/:pId/delete", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pId);
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all products
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get fav products
router.get("/favorites/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const favoriProducts = await Product.find({
      _id: { $in: user.favorites },
    });
    res.status(200).json(favoriProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get cart products
router.get("/cart/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const cartProducts = await Product.find({
      _id: { $in: user.cart },
    });
    res.status(200).json(cartProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a product
router.get("/:pId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pId);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get local

//fav a product
router.put("/:pId/fav", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const product = await Product.findById(req.params.pId);
    if (!user.favorites.includes(req.params.pId)) {
      await user.updateOne({ $push: { favorites: req.params.pId } });
      await product.updateOne({ $push: { favorites: req.body.userId } });
      res.status(200).json("liked");
    } else {
      await user.updateOne({ $pull: { favorites: req.params.pId } });
      await product.updateOne({ $pull: { favorites: req.body.userId } });
      res.status(200).json("like removed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//add product to cart
router.put("/cart/:pId/add", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const product = await Product.findById(req.params.pId);
    if (!user.cart.includes(req.params.pId)) {
      await user.updateOne({ $push: { cart: req.params.pId } });
      res.status(200).json("added");
    } else {
      res.status(200).json("quantity increased");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//add rating
router.put("/rating/:pId/add", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const product = await Product.findById(req.params.pId);
    await product.updateOne({
      $push: {
        ratings: { user: user.email, text: req.body.text, rate: req.body.rate },
      },
    });
    res.status(200).json("added");
  } catch (err) {
    res.status(500).json(err);
  }
});

//remove product from cart
router.put("/cart/:pId/remove", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const product = await Product.findById(req.params.pId);
    if (user.cart.includes(req.params.pId)) {
      await user.updateOne({ $pull: { cart: req.params.pId } });
      res.status(200).json("removed");
    } else {
      res.status(200).json("yu dont have this item");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
