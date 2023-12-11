import { config } from 'dotenv'

config()

export const envConfig = {
  port: process.env.PORT || 3001,
  host: process.env.HOST,
  mongoUri: process.env.MONGO_URI,

  dbUsersCollection: process.env.DB_USERS_COLLECTION,
  dbRefreshTokensCollection: process.env.DB_REFRESH_TOKENS_COLLECTION,

  jwtSecretAccessToken: process.env.JWT_SECRET_ACCESS_TOKEN,
  jwtSecretRefreshToken: process.env.JWT_SECRET_REFRESH_TOKEN,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
}
