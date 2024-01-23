const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isMerchant: { type: Boolean, default: false },
    img: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);