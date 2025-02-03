// Importamos las dependencias.
import bcrypt from 'bcrypt'

// Importamos los modelos.
import selectUserByIdModel from '../../models/users/selectUserByIdModel.js'
import updateUserPasswordModel from '../../models/users/updateUserPasswordModel.js'

// Importamos los servicios.
import validateSchemaUtil from '../../utils/validateSchemaUtil.js'

// Importamos el esquema.
import editPasswordSchema from '../../schemas/users/editPasswordSchema.js'

// Importamos los errores.
import { invalidCredentialsError } from '../../services/errorService.js'

// Función controladora que edita el password.
const editUserPasswordController = async (req, res, next) => {
  try {
    // Obtenemos los datos necesarios del body.
    const { currentPassword, newPassword, confirmPassword } = req.body

    // Validamos el body con Joi.
    await validateSchemaUtil(editPasswordSchema, req.body)

    // Obtenemos los datos del usuario.
    const user = await selectUserByIdModel(req.user.id)

    // Comprobamos si la contraseña actual es correcta.
    const validPass = await bcrypt.compare(currentPassword, user.password)

    // Si la contraseña actual no es correcta lanzamos un error.
    if (!validPass) {
      invalidCredentialsError()
    }

    // Actualizamos la contraseña del usuario.
    await updateUserPasswordModel(user.id, newPassword)

    res.send({
      status: 'ok',
      message: 'Contraseña actualizada con éxito',
    })
  } catch (err) {
    next(err)
  }
}

export default editUserPasswordController
