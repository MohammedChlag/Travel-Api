// Importamos las dependencias.
import express from 'express'

// Importamos las rutas de los usuarios y de las entradas.
import userRoutes from './userRoutes.js'
import entrieRoutes from './entrieRoutes.js'

// Creamos un router.
const router = express.Router()

// Indicamos a express dónde están las rutas de los usuarios y las entradas.
router.use(userRoutes)
router.use(entrieRoutes)

export default router
