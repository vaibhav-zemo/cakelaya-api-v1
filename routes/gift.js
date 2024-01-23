const express = require("express");
const router = express.Router();
const { verifyToken } = require("./verifyToken");
const Gift = require("../models/Gift");

router.get("/allGifts", async (req, res) => {
  try {
    const gift = await Gift.find({});
    res.status(200).json(gift);
  } catch (err) {
    console.log(err);
  }
});

router.post("/getGifts", async (req, res) => {
  try {
    const { age, gender, occassionType, relation, budget } = req.body;
    if (!age || !gender || !occassionType || !relation || !budget) {
      const err = "All Answers Required";
      res.status(500).json(err);
      return;
    }
    const gift = await Gift.find({
      Age: age,
      Gender: gender,
      "Occasion Type": occassionType,
      Relation: relation,
      Budget: budget,
    });
    res.status(200).json(gift);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
