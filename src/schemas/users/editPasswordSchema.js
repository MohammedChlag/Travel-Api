// Importamos joi.
import Joi from 'joi'

// Importamos los mensajes de error personalizados.
import joiErrorMessages from '../joiErrorMessages.js'

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
export const editPasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/,
    )
    .required()
    .messages(joiErrorMessages),
  newPassword: Joi.string()
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/,
    )
    .required()
    .messages(joiErrorMessages),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/,
    )
    .required()
    .messages(joiErrorMessages),
})

export default editPasswordSchema
