const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: { type: String },
    time: { type: String },
    occassion: { type: String },
    cakeName: { type: String },
    address: { type: String },
    number: { type: Number },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        size: {
          type: String,
          default: "1/2 Kg",
        },
        flavour: {
          type: String,
        },
        amount: {
          type: Number,
        },
        img: { type: String },
      },
    ],
    amount: { type: Number },
    status: { type: String, default: "pending" },
    delivered: { type: String, default: "pending" },
    headApp: { type: String, default: "amount" },
    stock: { type: String, default: "pending" },
    customizedImg: {
      type: String,
    },
    orderTime: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
