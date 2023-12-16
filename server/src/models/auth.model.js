/**
 * @swagger
 * components:
 *  schemas:
 *   SignupReqBody:
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *      required: true
 *      example: bruce_wayne
 *     email:
 *      type: string
 *      example: bruce@wayne.dc
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
 *      example: bruce@wayne.dc
 *     password:
 *      type: string
 *      example: Abcd12345@#
 *
 *   GoogleOAuthReqBody:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      example: Bruce Wayne
 *     email:
 *      type: string
 *      example: bruce@wayne.dc
 *     photo_url:
 *      type: string
 *      format: url
 *      example: https://unsplash.com/photos/8BmNu...
 *
 *   UpdateMeBody:
 *    type: object
 *    properties:
 *     username:
 *      type: string
 *      example: bruce_wayne
 *     password:
 *      type: string
 *      example: Abcd12345@#
 *     confirm_password:
 *      type: string
 *      example: Abcd12345@#
 *     photo_url:
 *      type: string
 *      format: url
 *      example: https://unsplash.com/photos/8BmNu...
 *
 *   SuccessAuthentication:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      example: 60f6f5e0a2c...
 *     username:
 *      type: string
 *      example: bruce_wayne
 *     email:
 *      type: string
 *      format: email
 *      example: bruce@wayne.dc
 *     photo_url:
 *      type: string
 *      format: url
 *      example: https://unsplash.com/photos/8BmNu...
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

import {
  CONFIRM_PASSWORD_MESSAGES,
  EMAIL_MESSAGES,
  PASSWORD_MESSAGES,
  PHOTO_URL_MESSAGES,
  USERNAME_MESSAGES,
} from '@/constants/message'
import { envConfig } from '@/constants/config'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, USERNAME_MESSAGES.IS_REQUIRED],
      unique: true,
      validate: [
        {
          validator: (username) => validator.isLength(username, { min: 3, max: 128 }),
          message: USERNAME_MESSAGES.LENGTH,
        },
        {
          validator: (username) => !username.includes(' '),
          message: USERNAME_MESSAGES.MUST_NOT_CONTAIN_SPACE,
        },
        {
          validator: (username) => username.match(/^[a-zA-Z0-9_]+$/),
          message: USERNAME_MESSAGES.MUST_NOT_CONTAIN_SPECIAL_CHARACTERS,
        },
      ],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, EMAIL_MESSAGES.IS_REQUIRED],
      unique: true,
      validate: [validator.isEmail, EMAIL_MESSAGES.INVALID],
    },

    photo_url: {
      type: String,
      default:
        'https://firebasestorage.googleapis.com/v0/b/auth-app-e1d3d.appspot.com/o/images%2Fdefault-avatar.gif?alt=media&token=1e71d11e-9c77-4338-999e-486573bfdf5d',
      validate: [validator.isURL, PHOTO_URL_MESSAGES.INVALID],
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
          // Bắt buộc dùng normal function để truy cập this.password
          validator(confirm_password) {
            return confirm_password === this.password || confirm_password === this._update?.$set?.password
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
  this.confirm_password = undefined

  if (!this.isModified('password')) return next()

  this.password = bcryptjs.hashSync(this.password, 10)
  next()
})

const User = mongoose.model(envConfig.dbUsersCollection, userSchema)
export default User
