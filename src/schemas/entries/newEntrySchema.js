// Importamos joi.
import joi from 'joi'

// Importamos el esquema que verifica una imagen.
import imgSchema from '../imgSchema.js'

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js'

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newEntrySchema = joi.object({
  title: joi.string().min(5).max(50).required().messages(joiErrorMessages),
  place: joi.string().min(3).max(30).required().messages(joiErrorMessages),
  description: joi.string().min(10).max(500).required().messages(joiErrorMessages),
  photoA: imgSchema.optional(),
  photoB: imgSchema.optional(),
  photoC: imgSchema.optional(),
})

export default newEntrySchema
