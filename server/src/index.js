import express from 'express'
import { envConfig } from '@/constants/config'

const PORT = envConfig.port
const app = express()

app.listen(PORT, () => {
  console.log(`😎 Server listening on port ${PORT}`)
})
