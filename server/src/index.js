import express from 'express'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { envConfig } from '@/constants/config'
import authRouter from '@/routes/auth.route'
import { defaultErrorHandler } from '@/middlewares/error.middlewares'

const PORT = envConfig.port
const MONGO_URI = envConfig.mongoUri

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.route.js', './src/models/*.model.js'], // files containing annotations as above
}

const openapiSpecification = swaggerJsdoc(options)

mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`🪐 Connected to database, server is running on port ${PORT}`)
    })
  )
  .catch((err) => {
    console.log('🚧 Error connecting to database', err)
  })

const app = express()

// Quy định cors
app.use(
  cors({
    origin: true,
    credentials: true, // cho phép client gởi cookie lên server
  })
)

// parse cookie của client gởi lên, chuyển thành dạnh object để xử lý
app.use(cookieParser())

// parse json của client gởi lên, chuyển thành dạnh object để xử lý
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
app.use('/auth', authRouter)

// error handler cho toàn app. Default error handler
app.use(defaultErrorHandler)
