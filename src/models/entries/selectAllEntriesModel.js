// Importamos la función que devuelve una conexión con la base de datos.
import getPool from '../../db/getPool.js'

// Función que realiza una consulta a la base de datos para obtener el listado de entradas.
const selectAllEntriesModel = async (keyword = '', userId = '') => {
  const pool = await getPool()

  // Obtenemos el listado de entradas.
  const [entries] = await pool.query(
    `
            SELECT 
                E.id,
                E.title,
                E.place, 
                U.username,
                BIT_OR(V.userId = ?) AS votedByMe, 
                E.userId = ? AS owner,
                AVG(IFNULL(V.value, 0)) AS votes,
                E.createdAt
            FROM entries E
            LEFT JOIN entryVotes V ON V.entryId = E.id
            INNER JOIN users U ON U.id = E.userId
            WHERE E.title LIKE ? OR E.place LIKE ? OR E.description LIKE ?
            GROUP BY E.id
            ORDER BY E.createdAt DESC
        `,
    [userId, userId, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`],
  )

  // Recorremos el array de entradas para agregar a cada entrada la primera foto (si hay).
  for (const entry of entries) {
    // Buscamos las fotos de la entrada.
    const [photos] = await pool.query(`SELECT id, name FROM entryPhotos WHERE entryId = ?`, [
      entry.id,
    ])

    // Agregamos las fotos a la entrada. Si no existe foto en la posición cero establecemos
    // un valor null.
    entry.photos = photos

    // Establecemos como valores booleanos "votedByMe" y "owner"
    entry.votedByMe = Boolean(entry.votedByMe)
    entry.owner = Boolean(entry.owner)

    // La media de votos es un valor de tipo String. Podemos convertirla a Number.
    entry.votes = Number(entry.votes)
  }

  // Retornamos las entradas.
  return entries
}

export default selectAllEntriesModel
