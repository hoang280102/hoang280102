import express from 'express'
import 'dotenv/config'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import morgan from 'morgan'
import userRouter from './routes/users.routes'
import databaseServices from './services/database.services'
import { createFile } from './utils/createFile'
import cors from 'cors'

const app = express()

const port = process.env.PORT

createFile()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.routes.ts', './src/models/request/users.request.ts'] // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options)
//ket noi data base

databaseServices.connect()

// createFile()
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())
app.use('/users', userRouter)
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
