const nodemailer = require('nodemailer')
const { StatusCodes } = require('http-status-codes')

const sendEmail = async (req, res) => {
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

module.exports = sendEmail