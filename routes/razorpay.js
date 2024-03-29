const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require('crypto')
const dotenv = require("dotenv");
dotenv.config();


router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })
		
        const options = {
            amount: parseInt(req.body.amount)*100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        const order = await instance.orders.create(options);
        if (!order) return res.status(500).send("Some error occured");
        return res.status(200).json({data: order});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

// payment verify
router.post("/verify", async (req, res) => {
	try {
		const { order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

module.exports = router;