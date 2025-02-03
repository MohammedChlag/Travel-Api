// Importamos las dependencias.
import bcrypt from 'bcrypt'

// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js'

// Función que realiza una consulta a la base de datos para actualizar la contraseña de un usuario.
const updateUserPasswordModel = async (userId, newPassword) => {
  const pool = await getPool()

  // Encriptamos la nueva contraseña.
  const hashedPass = await bcrypt.hash(newPassword, 10)

  // Actualizamos la contraseña del usuario.
  await pool.query(`UPDATE users SET password = ? WHERE id = ?`, [hashedPass, userId])
}

export default updateUserPasswordModel
