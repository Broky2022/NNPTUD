const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    secure: false,
    auth: {
        user: "3d891bd9872889",
        pass: "67deed20d9715f",
    },
});

module.exports = {
    send: async function (to,url) {
        return await transporter.sendMail({
            from: "Test Gmail",
            to: to,
            subject: "Test API Reset Password",
            html: `<a href=${url}>RESET</a>`, 
        });
    }
}