const nodemailer = require('nodemailer')
const { StatusCodes } = require('http-status-codes')
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

const sendEmailEthereal = async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.ETHEREAL_USER,
            pass: process.env.ETHEREAL_PASS
        }
    })

    const info = await transporter.sendMail({
        from: '"Luffy 👻" <luffy@gmail.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    })

    res.status(StatusCodes.OK).json({ info })
}

const sendEmail = async (req, res) => {
    const DOMAIN = process.env.MAILGUN_DOMAIN

    const info = await mg.messages.create(DOMAIN, {
        from: `Excited User <testsender@mail.com>`,
        to: ["verifiedMailInMailgunSanbox@mail.com"],
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<h1>Testing some Mailgun awesomeness!</h1>"
    })

    res.status(StatusCodes.OK).json(info)
}

module.exports = sendEmail