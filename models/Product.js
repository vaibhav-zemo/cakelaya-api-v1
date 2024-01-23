const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Array, required: true },
    inStock: { type: Boolean, default: true },
    realPrice: {type: Number}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
