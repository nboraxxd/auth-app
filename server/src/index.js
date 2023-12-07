import express from 'express'
import mongoose from 'mongoose'

import { envConfig } from '@/constants/config'
import usersRouter from '@/routes/users.route'

const PORT = envConfig.port
const MONGO_URI = envConfig.mongoUri

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('🎉 Connected to database')
  })
  .catch((err) => {
    console.log('🚧 Error connecting to database', err)
  })

const app = express()

app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`😎 Server listening on port ${PORT}`)
})
