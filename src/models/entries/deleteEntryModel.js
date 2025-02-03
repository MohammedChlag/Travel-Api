// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js'

// Función que realiza una consulta a la base de datos para eliminar una entrada.
const deleteEntryModel = async entryId => {
  const pool = await getPool()

  // Eliminamos las fotos de la entrada.
  await pool.query(`DELETE FROM entryPhotos WHERE entryId = ?`, [entryId])

  // Eliminamos los votos de la entrada.
  await pool.query(`DELETE FROM entryVotes WHERE entryId = ?`, [entryId])

  // Eliminamos la entrada.
  await pool.query(`DELETE FROM entries WHERE id = ?`, [entryId])
}

export default deleteEntryModel
