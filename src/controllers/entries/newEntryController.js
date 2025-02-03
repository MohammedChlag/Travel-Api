// Importamos los modelos.
import insertEntryModel from '../../models/entries/insertEntryModel.js'
import insertPhotoModel from '../../models/entries/insertPhotoModel.js'

// Importamos los servicios.
import { savePhotoService } from '../../services/photoService.js'

// Importamos los servicios.
import validateSchemaUtil from '../../utils/validateSchemaUtil.js'

// Importamos el esquema.
import newEntrySchema from '../../schemas/entries/newEntrySchema.js'

// Función controladora final que agrega una nueva entrada.
const newEntryController = async (req, res, next) => {
  try {
    const { title, place, description } = req.body

    console.log('Aqui estoy ', Object.assign(req.body, req.files))

    // Validamos el body con Joi. Fusionamos en un solo objeto las propiedades de body y de files.
    await validateSchemaUtil(newEntrySchema, Object.assign(req.body, req.files))

    // Insertamos la entrada y obtenemos el id que se le ha asignado.
    const entryId = await insertEntryModel(title, place, description, req.user.id)

    // Array donde pushearemos las fotos (si hay).
    const photos = []

    // Si "req.files" existe quiere decir que hay algún archivo en la petición.
    if (req.files) {
      // Recorremos las fotos. Utilizamos el método "Object.values" para obtener un
      // array de fotos. Para evitar que el array de fotos tenga más de tres fotos aplicamos
      // el método slice.
      for (const photo of Object.values(req.files).slice(0, 3)) {
        // Guardamos la foto en disco y obtenemos su nombre. Redimensionamos a un ancho
        // de 500px.
        const photoName = await savePhotoService(photo, 500)

        // Insertamos la foto en la tabla de fotos.
        const photoId = await insertPhotoModel(photoName, entryId)

        // Pusheamos la foto al array de fotos.
        photos.push({
          id: photoId,
          name: photoName,
        })
      }
    }

    res.send({
      status: 'ok',
      data: {
        entry: {
          id: entryId,
          title,
          place,
          description,
          userId: req.user.id,
          photos,
          createdAt: new Date(),
        },
      },
    })
  } catch (err) {
    next(err)
  }
}

export default newEntryController
