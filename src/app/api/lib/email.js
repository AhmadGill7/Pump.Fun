// /lib/email.js
import nodemailer from "nodemailer";

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mw951390@gmail.com",
      pass:"ylrb kmrb ufhs mwbe",
    },
  });

  const mailOptions = {
    from: "mw951390@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};
