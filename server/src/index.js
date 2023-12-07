import express from 'express'
import { envConfig } from '@/constants/config'
import mongoose from 'mongoose'

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

app.listen(PORT, () => {
  console.log(`😎 Server listening on port ${PORT}`)
})
