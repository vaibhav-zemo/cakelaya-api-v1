const nodemailer = require("../config/nodemailer");

exports.newOrder = (order) => {
  let htmlString = nodemailer.renderTemplate(
    { order: order },
    "/new_order.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "support@cakelaya.com",
      to: [
        "vaibhavpathak852947@gmail.com",
        "abhimanyusolanki10@gmail.com",
        "advit.20404@knit.ac.in",
      ],
      subject: "New Order!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      return;
    }
  );
};

exports.newOrderToUser = (order, mail, subject) => {
  let htmlString = nodemailer.renderTemplate(
    { order: order },
    "/new_order_to_user.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: "support@cakelaya.com",
      to: mail,
      subject: subject,
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      return;
    }
  );
};

exports.newOrderToSultanpur = (order) => {
  let htmlString = nodemailer.renderTemplate(
    { order: order },
    "/new_order_to.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "support@cakelaya.com",
      to: [
        "sateesh9883@gmail.com",
      ],
      subject: "New Order!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      return;
    }
  );
};

exports.newOrderToNoida = (order) => {
  let htmlString = nodemailer.renderTemplate(
    { order: order },
    "/new_order_to.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "support@cakelaya.com",
      to: [
        "ayushsinghbohra8595@gmail.com",
        "mohan8447197270@gmail.com",
      ],
      subject: "New Order!",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      return;
    }
  );
};

exports.newOrderToJuice = (order) => {
  let htmlString = nodemailer.renderTemplate(
    { order: order },
    "/new_order_to.ejs"
  );

  nodemailer.transporter.sendMail(
    {
      from: "support@cakelaya.com",
      to: ["raviyadav6848@gmail.com"],
      subject: "New Order",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("Error in sending mail", err);
        return;
      }
      return;
    }
  );
};
