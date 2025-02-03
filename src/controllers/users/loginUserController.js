// Importamos las dependencias.
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Importamos los modelos.
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js'

// Importamos los servicios.
import validateSchemaUtil from '../../utils/validateSchemaUtil.js'

// Importamos el esquema.
import loginUserSchema from '../../schemas/users/loginUserSchema.js'

// Importamos los errores.
import { invalidCredentialsError, pendingActivationError } from '../../services/errorService.js'

// Función controladora final que logea a un usuario retornando un token.
const loginUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Validamos el body con Joi.
    await validateSchemaUtil(loginUserSchema, req.body)

    // Seleccionamos los datos del usuario que necesitamos utilizando el email.
    const user = await selectUserByEmailModel(email, password)

    // Variable que almacenará un valor booleano indicando si la contraseña es correcto o no.
    let validPass

    // Si existe un usuario comprobamos si la contraseña coincide.
    if (user) {
      // Comprobamos si la contraseña es válida.
      validPass = await bcrypt.compare(password, user.password)
    }

    // Si las contraseña no coincide o no existe un usuario con el email proporcionado
    // lanzamos un error.
    if (!user || !validPass) {
      invalidCredentialsError()
    }

    // Si el usuario no está activo lanzamos un error.
    if (!user.active) {
      pendingActivationError()
    }

    // Objeto con la información que queremos almacenar en el token.
    const tokenInfo = {
      id: user.id,
      role: user.role,
    }

    // Creamos el token.
    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: '7d',
    })

    res.send({
      status: 'ok',
      data: {
        token,
      },
    })
  } catch (err) {
    next(err)
  }
}

export default loginUserController
