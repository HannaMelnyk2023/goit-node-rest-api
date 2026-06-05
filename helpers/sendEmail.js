import nodemailer from "nodemailer";
// require("dotenv").config();

const { GMAIL_USER, GMAIL_PASS } = process.env;
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    }
});

const sendEmail = async (data) => {
    const email = { ...data, from: GMAIL_USER };
    await transporter.sendMail(email);
    return true;
}

export default sendEmail;

