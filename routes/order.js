const Order = require("../models/Order");
const User = require("../models/User");
const ordersMailer = require("../mailers/orders_mailer");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const moment = require("moment/moment");
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    ordersMailer.newOrder(savedOrder);
    res.status(200).json(savedOrder);
    return;
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: "approve",
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/deliver/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        delivered: "approve",
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/reject/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: "reject",
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/headapp/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        headApp: "approve",
      },
      { new: true }
    );

    const user = await User.findById(updatedOrder.userId);
    ordersMailer.newOrderToUser(updatedOrder, user.email, "Order Placed Successfully!")
    if (req.body.city == "Sultanpur") {
      ordersMailer.newOrderToSultanpur(updatedOrder);
    } else if (req.body.city == "Noida") {
      ordersMailer.newOrderToNoida(updatedOrder);
    }
    else if(req.body.product == "Chaats and Juices"){
      ordersMailer.newOrderToJuice(updatedOrder);
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/headapp/reject/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        headApp: "reject",
      },
      { new: true }
    );
    const user = await User.findById(updatedOrder.userId);
    ordersMailer.newOrderToUser(updatedOrder, user.email, "Order Rejected!")
    res.status(200).json(updatedOrder);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.put("/headapp/remove/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        stock: "approve",
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/headapp/amount/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        headApp: "pending",
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
// router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });
//     res.status(200).json(orders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find({
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      headApp: "approve",
      delivered: "pending",
    }).sort({ createdAt: -1 });

    for (order of orders) {
      let utcDate = moment(order.createdAt).format("MMM Do YYYY");
      let Hourtime = moment(order.createdAt).format("h");
      let Mintime = moment(order.createdAt).format("mm");
      let am = moment(order.createdAt).format("A");

      let totalMin = Number(Hourtime + 5) * 60 + Number(Mintime + 30);
      totalMin =
        String(Math.floor((totalMin / 60) % 24)) + ":" + String(totalMin % 60);
      order.name = order.name + "*" + totalMin + ", " + utcDate;
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/headapp", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find({
      createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      delivered: "pending",
      stock: "pending",
    }).sort({ createdAt: -1 });

    for (order of orders) {
      let utcDate = moment(order.createdAt).format("MMM Do YYYY");
      let Hourtime = moment(order.createdAt).format("h");
      let Mintime = moment(order.createdAt).format("mm");
      let am = moment(order.createdAt).format("A");

      let totalMin = Number(Hourtime + 5) * 60 + Number(Mintime + 30);
      totalMin =
        String(Math.floor((totalMin / 60) % 24)) + ":" + String(totalMin % 60);
      order.name = order.name + "*" + totalMin + ", " + utcDate;
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:userId", async (req, res) => {
  try {
    var orders = await Order.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    for (order of orders) {
      let utcDate = moment(order.createdAt).format("MMM Do YYYY");
      let Hourtime = moment(order.createdAt).format("h");
      let Mintime = moment(order.createdAt).format("mm");
      let am = moment(order.createdAt).format("A");

      let totalMin = Number(Hourtime + 5) * 60 + Number(Mintime + 30);
      totalMin =
        String(Math.floor((totalMin / 60) % 24)) + ":" + String(totalMin % 60);
      order.name = order.name + "*" + totalMin + ", " + utcDate;
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET MONTHLY INCOME

// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//   const productId = req.query.pid;
//   const date = new Date();
//   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//   const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
//   try {
//     const income = await Order.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: previousMonth },
//           ...(productId && {
//             products: { $elemMatch: { productId } },
//           }),
//         },
//       },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//           sales: "$amount",
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: "$sales" },
//         },
//       },
//     ]);

//     res.status(200).json(income);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
