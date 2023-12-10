import mongoose from 'mongoose'

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    iat: {
      type: Date,
      required: true,
    },
    exp: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

const RefreshToken = mongoose.model('refresh_token', refreshTokenSchema)
export default RefreshToken
