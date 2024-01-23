const mongoose = require("mongoose");

const GiftSchema = new mongoose.Schema(
  {
    "Product Name": {
      type: String,
    },
    Age: {
      type: String,
      require: true,
    },
    Gender: {
      type: String,
      require: true,
    },
    "Occasion Type": {
      type: String,
      require: true,
    },
    Relation: {
      type: String,
      require: true,
    },
    Budget: {
      type: String,
      require: true,
    },
    "Affiliate Link": {
      type: String,
    },
    "Affiliate Code": {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gift", GiftSchema);
