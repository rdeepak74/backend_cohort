import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()
//create transporter
//mailOptions
//send mail

//send mail start
export const sendMail = async (to, subject, text, html, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    })
    const mailOptions = {
      from: process.env.MAILTRAP_SENDEREMAIL, // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text,
      html: html,
    }

    const mailsend = await transporter.sendMail(mailOptions)
    // console.log(mailsend)
    return 'Email sent successfully'
  } catch (error) {
    console.log(error)
    return 'Emai not sent'
  }
}
