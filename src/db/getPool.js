import mysql from 'mysql2/promise'

// Obtenemos las variables de entorno necesarias mediante destructuring.
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } from '../../env.js'

// Variable que almacená un grupo (array) de conexiones.
let pool

// Función que retorna un pool de conexiones con la base de datos.
const getPool = async () => {
  try {
    // Si la variable "pool" es undefined...
    if (!pool) {
      // Creamos una pool temporal.
      const poolTemp = mysql.createPool({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
      })

      // Con el pool temporal creamos la base de datos si no existe.
      await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`)

      // Creamos un grupo de conexiones.
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        // Zona horaria del servidor de MySQL. Por defecto es "local", que nos sirve si tenemos el server de Node y de MySQL en el mismo PC. Si tuviésemos el servidor de Node en un sitio con zona horaria "x" y el de MySQL en zona horaria "y", habría que colocar la zona horaria "y"
        timezone: 'local',
      })
    }

    // Retornamos un pool.
    return pool
  } catch (err) {
    //console.error(err);
    throw err
  }
}

// Exportamos la función.
export default getPool
