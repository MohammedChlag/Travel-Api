// Importamos las dependencias.
import express from 'express'

// Importamos las funciones controladoras intermedias.
import { authUserController, userExistsController } from '../middlewares/index.js'

// Importamos las funciones controladoras finales.
import {
  newUserController,
  loginUserController,
  getUserProfileController,
  getOwnUserController,
  editUserAvatarController,
  editUserPassController,
  validateUserController,
  sendRecoverPassController,
  editUserPasswordController,
} from '../controllers/users/index.js'

// Creamos un router.
const router = express.Router()

// Crear un usuario pendiente de activar.
router.post('/users/register', newUserController)

// Validar a un usuario.
router.put('/users/validate/:registrationCode', validateUserController)

// Login de usuario.
router.post('/users/login', loginUserController)

// Obtener perfil público de un usuario.
router.get('/users/:userId', userExistsController, getUserProfileController)

// Obtener perfil privado de un usuario.
router.get('/users', authUserController, userExistsController, getOwnUserController)

// Editar el avatar de un usuario.
router.put('/users/avatar', authUserController, userExistsController, editUserAvatarController)

// Editar la contraseña de un usuario.
router.put('/users/password/edit', authUserController, editUserPasswordController)

// Enviar email de recuperación de contraseña.
router.post('/users/password/recover', sendRecoverPassController)

// Editar la contraseña de un usuario con un código de recuperación.
router.put('/users/password', editUserPassController)

export default router
