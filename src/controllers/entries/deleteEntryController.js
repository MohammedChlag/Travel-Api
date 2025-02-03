// Importamos los modelos.
import selectEntryByIdModel from '../../models/entries/selectEntryByIdModel.js'
import deleteEntryModel from '../../models/entries/deleteEntryModel.js'

// Importamos los servicios.
import { deletePhotoService } from '../../services/photoService.js'

// Importamos los errores.
import { notFoundError } from '../../services/errorService.js'

// Función controladora final que elimina una entrada.
const deleteEntryController = async (req, res, next) => {
  try {
    // Obtenemos el id de la entrada de los path params.
    const { entryId } = req.params

    // Obtenemos los detalles de la entrada.
    const entry = await selectEntryByIdModel(entryId)

    // Si la entrada no existe lanzamos un error.
    if (!entry) {
      notFoundError('entrada')
    }

    // Eliminamos las fotos de la entrada.
    for (const photo of entry.photos) {
      await deletePhotoService(photo.name)
    }

    // Eliminamos la entrada de la base de datos.
    await deleteEntryModel(entryId)

    res.send({
      status: 'ok',
      message: 'Entrada eliminada',
    })
  } catch (err) {
    next(err)
  }
}

export default deleteEntryController
