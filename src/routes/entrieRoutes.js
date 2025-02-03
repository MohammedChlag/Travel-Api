// Importamos las dependencias.
import express from 'express'

// Importamos las funciones controladoras intermedias.
import {
  authUserController,
  userExistsController,
  entryExistsController,
  canEditController,
  authUserOptionalController,
} from '../middlewares/index.js'

// Importamos las funciones controladoras finales.
import {
  newEntryController,
  addEntryPhotoController,
  deleteEntryPhotoController,
  voteEntryController,
  listEntriesController,
  getEntryController,
  deleteEntryController,
} from '../controllers/entries/index.js'

// Creamos un router.
const router = express.Router()

// Crear una nueva entrada.
router.post('/entries', authUserController, userExistsController, newEntryController)

// Agregar una foto a una entrada.
router.post(
  '/entries/:entryId/photos',
  authUserController,
  userExistsController,
  entryExistsController,
  canEditController,
  addEntryPhotoController,
)

// Eliminar una foto de una entrada.
router.delete(
  '/entries/:entryId/photos/:photoId',
  authUserController,
  authUserOptionalController,
  userExistsController,
  entryExistsController,
  canEditController,
  deleteEntryPhotoController,
)

// Eliminar una entrada
router.delete(
  '/entries/:entryId',
  authUserController,
  userExistsController,
  entryExistsController,
  canEditController,
  deleteEntryController,
)

// Votar una entrada.
router.post(
  '/entries/:entryId/votes',
  authUserController,
  userExistsController,
  entryExistsController,
  voteEntryController,
)

// Obtener el listado de entradas.
router.get('/entries', authUserOptionalController, listEntriesController)

// Obtener info de una entrada concreta.
router.get(
  '/entries/:entryId',
  authUserOptionalController,
  entryExistsController,
  getEntryController,
)

export default router
