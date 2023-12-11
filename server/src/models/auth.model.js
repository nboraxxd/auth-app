/**
 * @swagger
 * components:
 *  schemas:
 *   SignupReqBody:
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *      example: atiiwo
 *     email:
 *      type: string
 *      example: atiiwo@vuvu.om
 *     password:
 *      type: string
 *      example: Abcd12345@#
 *     confirm_password:
 *      type: string
 *      example: Abcd12345@#
 *
 *   SigninReqBody:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      example: atiiwo@vuvu.om
 *     password:
 *      type: string
 *      example: Abcd12345@#
 *
 *   SuccessAuthentication:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      example: 60f6f5e0a2c...
 *     username:
 *      type: string
 *      example: atiiwo
 *     email:
 *      type: string
 *      format: email
 *      example: atiiwo@vuvu.om
 *     createdAt:
 *      type: string
 *      format: ISO 8601
 *      example: 2021-07-20T08:46:24.000Z
 *     updatedAt:
 *      type: string
 *      format: ISO 8601
 *      example: 2021-07-20T08:46:24.000Z
 *     __v:
 *      type: number
 *      example: 0
 */

import mongoose from 'mongoose'
import validator from 'validator'
import bcryptjs from 'bcryptjs'

import { CONFIRM_PASSWORD_MESSAGES, EMAIL_MESSAGES, PASSWORD_MESSAGES, USERNAME_MESSAGES } from '@/constants/message'
import { envConfig } from '@/constants/config'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, USERNAME_MESSAGES.IS_REQUIRED],
      unique: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, EMAIL_MESSAGES.IS_REQUIRED],
      unique: true,
      validate: [validator.isEmail, EMAIL_MESSAGES.INVALID],
    },

    password: {
      type: String,
      required: [true, PASSWORD_MESSAGES.IS_REQUIRED],
      validate: [
        {
          validator: (password) => validator.isLength(password, { min: 6, max: 86 }),
          message: PASSWORD_MESSAGES.LENGTH,
        },
        {
          validator: (password) =>
            validator.isStrongPassword(password, { minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
          message: PASSWORD_MESSAGES.IS_STRONG,
        },
      ],
    },

    confirm_password: {
      type: String,
      required: [true, CONFIRM_PASSWORD_MESSAGES.IS_REQUIRED],
      validate: [
        {
          validator: (confirm_password) => validator.isLength(confirm_password, { min: 6, max: 86 }),
          message: CONFIRM_PASSWORD_MESSAGES.LENGTH,
        },
        {
          validator: (confirm_password) =>
            validator.isStrongPassword(confirm_password, {
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            }),
          message: CONFIRM_PASSWORD_MESSAGES.IS_STRONG,
        },
        {
          validator: (confirm_password) => {
            return confirm_password === this.password
          },
          message: CONFIRM_PASSWORD_MESSAGES.DOES_NOT_MATCH,
        },
      ],
    },
  },
  { timestamps: true }
)

userSchema.index({ username: 1 }, { unique: true })
userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ email: 1, password: 1 })

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  this.password = bcryptjs.hashSync(this.password, 10)
  this.confirm_password = undefined
  next()
})

const User = mongoose.model(envConfig.dbUsersCollection, userSchema)
export default User
