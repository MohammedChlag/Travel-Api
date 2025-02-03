// Importamos las dependencias.
import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import morgan from 'morgan'

// Importamos los errores.
import { errorController, notFoundController } from './src/controllers/errors/index.js'

// Importamos las rutas. Recordad que no es necesario indicar el fichero "index.js".
import routes from './src/routes/index.js'

// Importamos el puerto.
import { PORT, UPLOADS_DIR } from './env.js'

// Creamos el servidor.
const app = express()

// Middleware que muestra por consola información sobre la petición entrante.
app.use(morgan('dev'))

// Middleware que evita que las CORS interfieran a la hora de conectar el frontend con
// el backend.
app.use(cors())

// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
app.use(express.static(UPLOADS_DIR))

// Middleware que "desencripta" un body en formato "raw" creando la propiedad
// "body" en el objeto "request".
app.use(express.json())

// Middleware que "desencripta" un body en formato "form-data" creando la propiedad
// "body" y la propiedad "files" en el objeto "request"
app.use(fileUpload())

// Middleware que indica a express dónde están las rutas.
app.use(routes)

// Middleware de ruta no encontrada.
app.use(notFoundController)

// Middleware de error.
app.use(errorController)

// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
