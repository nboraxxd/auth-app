import mongoose from 'mongoose'
import isJWT from 'validator/lib/isJWT'

import { envConfig } from '@/constants/config'
import { DATE_MESSAGES, REFRESH_TOKEN_MESSAGES, USER_MESSAGES } from '@/constants/message'
import User from '@/models/auth.model'

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, REFRESH_TOKEN_MESSAGES.ID_IS_REQUIRED],
      unique: true,
      validate: {
        validator: (token) => isJWT(token),
        message: REFRESH_TOKEN_MESSAGES.INVALID,
      },
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, USER_MESSAGES.ID_IS_REQUIRED],
      ref: User,
    },

    iat: {
      type: Date,
      required: [true, DATE_MESSAGES.IS_REQUIRED],
    },

    exp: {
      type: Date,
      required: [true, DATE_MESSAGES.IS_REQUIRED],
    },
  },
  { timestamps: true }
)

refreshTokenSchema.index({ token: 1 }, { unique: true })

const RefreshToken = mongoose.model(envConfig.dbRefreshTokensCollection, refreshTokenSchema)
export default RefreshToken
