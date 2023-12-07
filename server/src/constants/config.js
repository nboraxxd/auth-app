import { config } from 'dotenv'

config()

export const envConfig = {
  port: process.env.PORT || 3001,
  host: process.env.HOST,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
}
