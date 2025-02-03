// Importamos las dependencias.
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js'

// Importamos los servicios.
import sendMailUtil from '../../utils/sendMailUtil.js'

// Importamos los errores.
import {
  emailAlreadyRegisteredError,
  userAlreadyRegisteredError,
} from '../../services/errorService.js'

// Función que realiza una consulta a la base de datos para crear un nuevo usuario.
const insertUserModel = async (username, email, password, registrationCode) => {
  const pool = await getPool()

  // Buscamos en la base de datos algún usuario con ese nombre.
  let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [username])

  // Si existe algún usuario con ese nombre lanzamos un error.
  if (users.length > 0) {
    emailAlreadyRegisteredError()
  }

  // Buscamos en la base de datos algún usuario con ese email.
  ;[users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email])

  // Si existe algún usuario con ese email lanzamos un error.
  if (users.length > 0) {
    userAlreadyRegisteredError()
  }

  // Creamos el asunto del email de verificación.
  const emailSubject = 'Activa tu usuario en Travel diary 🏞️'

  // Creamos el contenido del email
  const emailBody = `
            ¡Bienvenid@ ${username}!

            Gracias por registrarte en Travel Diary. Para activar tu cuenta, haz clic en el siguiente enlace:

            <a href="http://localhost:3000/users/validate/${registrationCode}">Activar mi cuenta</a>
        `

  // Enviamos el email de verificación al usuario.
  await sendMailUtil(email, emailSubject, emailBody)

  // Encriptamos la contraseña.
  const hashedPass = await bcrypt.hash(password, 10)

  // Insertamos el usuario.
  await pool.query(
    `INSERT INTO users(id, username, email, password, registrationCode) VALUES(?, ?, ?, ?, ?)`,
    [uuid(), username, email, hashedPass, registrationCode],
  )
}

export default insertUserModel
