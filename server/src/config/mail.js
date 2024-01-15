const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    // user: process.env.EMAIL,
    // pass: process.env.PASSWORD,
    user: "resend",
    pass: "re_Ync3MmB5_BeYhsSCeSk4AvxauUT9QN24W",
  },
});

module.exports = transporter;
