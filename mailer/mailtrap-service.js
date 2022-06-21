import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: '127.0.0.1',
  port: '1025',
  auth: {
    user: '3676e76b5e2032',
    pass: 'c31179b13ec98d',
  },
})
const sendMail = async (mailInfo) => {
  await transporter.sendMail(mailInfo)
  transporter.close()
  return {
    numberSent: mailInfo.to.length,
  }
}
export { sendMail }