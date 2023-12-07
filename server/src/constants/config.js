import { config } from 'dotenv'

config()

export const envConfig = {
  port: process.env.PORT || 3001,
  host: process.env.HOST,
  mongoUri: process.env.MONGO_URI,
}
