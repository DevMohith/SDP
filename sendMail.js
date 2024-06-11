const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')
const msg = {
  to: 'neubinsebastian01@gmail.com', // Change to your recipient
  from: 'GaganGowda.MadamangalaRavi@stud.hochschule-heidelberg.de', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })