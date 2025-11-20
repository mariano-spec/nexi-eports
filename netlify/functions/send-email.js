import nodemailer from 'nodemailer'

const GMAIL_USER = process.env.GMAIL_USER
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  throw new Error('Gmail credentials not configured')
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD
  }
})

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { to, subject, template, variables } = JSON.parse(event.body)

    if (!to || !subject || !template) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: to, subject, template' })
      }
    }

    let htmlContent = ''

    if (template === 'pressupost') {
      const { name, packages, price, conversationId } = variables
      htmlContent = `
        <h2>Hola ${name}!</h2>
        <p>Gràcies per contactar amb eportsinternet.</p>
        <h3>El teu pressupost:</h3>
        <ul>
          ${packages.map(p => `<li>${p}</li>`).join('')}
        </ul>
        <p><strong>Preu mensual: ${price}€</strong></p>
        <p>Un especialista es posarà en contacte aviat per confirmar-te tots els detalls.</p>
        <p>Telèfon Comercial: 977 090 505</p>
        <hr>
        <p><small>ID Conversa: ${conversationId}</small></p>
      `
    } else if (template === 'confirmacio') {
      const { name } = variables
      htmlContent = `
        <h2>Hola ${name}!</h2>
        <p>Hem rebut la teva consulta.</p>
        <p>En breus moments, un especialista d'eportsinternet es posarà en contacte.</p>
        <p>Gràcies per confiar en nosaltres!</p>
      `
    }

    const mailOptions = {
      from: GMAIL_USER,
      to: to,
      subject: subject,
      html: htmlContent
    }

    const info = await transporter.sendMail(mailOptions)

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        messageId: info.messageId
      })
    }

  } catch (error) {
    console.error('Error sending email:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error sending email',
        message: error.message
      })
    }
  }
}
