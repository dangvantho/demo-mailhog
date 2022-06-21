import * as mailtrapService from './mailtrap-service.js'

const mailer = mailtrapService

const send = async (mailInfos) => {
  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
  }
  const { tos, rejectedList } = mailInfos.to.reduce(
    (emails, email) => {
      if (validateEmail(email)) {
        emails.tos.push(email)
      } else {
        emails.rejectedList.push(email)
      }
      return emails
    },
    { tos: [], rejectedList: [] }
  )
  const validatedMailInfos = {
    ...mailInfos,
    from: `<${mailInfos.from}>`,
    to: tos,
    text: mailInfos.textContent,
    html: mailInfos.html || '',
  }

  const sentResult = await mailer.sendMail(validatedMailInfos).catch((err) => {
    console.log(err)
    return {
      numberSent: mailInfos.to.length,
      hasError: true,
      mailInfos,
    }
  })
  return {
    ...sentResult,
    hasError: sentResult.hasError || !!rejectedList.length,
    rejectedList,
  }
}

export default send