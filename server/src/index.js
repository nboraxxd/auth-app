import express from 'express'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

import { envConfig } from '@/constants/config'
import usersRouter from '@/routes/users.route'
import authRouter from '@/routes/auth.route'

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
  .then(() => {
    console.log('🎉 Connected to database')
  })
  .catch((err) => {
    console.log('🚧 Error connecting to database', err)
  })

const app = express()

// parse json của client gởi lên, chuyển thành dạnh object để xử lý
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`😎 Server listening on port ${PORT}`)
})
