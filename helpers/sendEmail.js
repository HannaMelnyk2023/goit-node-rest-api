import sgMAil from "@sendgrid/mail";
require('dotenv').config();


const { SENDGRID_API_KEY } = process.env;
sgMAil.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: "<EMAIL>" };
    await sgMAil.send(email);
    return true;
}

export default sendEmail;

