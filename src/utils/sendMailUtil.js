// Importamos las dependencias.
import brevo from '@getbrevo/brevo'

// Importamos los errores.
import { sendEmailError } from '../services/errorService.js'

// Obtenemos las variables de entorno necesarias.
import { SMTP_USER, SMTP_API_KEY } from '../../env.js'

// Creamos una instancia para poder enviar emails con @getbrevo.
const apiInstance = new brevo.TransactionalEmailsApi()

apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, SMTP_API_KEY)

// Función que envía un mail a un usuario.
const sendMailUtil = async (to, subject, text) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = subject
    sendSmtpEmail.to = [{ email: to }]
    sendSmtpEmail.htmlContent = text
    sendSmtpEmail.sender = { name: 'Equipo Travel', email: SMTP_USER }
    await apiInstance.sendTransacEmail(sendSmtpEmail)
  } catch (err) {
    console.error(err)
    sendEmailError()
  }
}

export default sendMailUtil
