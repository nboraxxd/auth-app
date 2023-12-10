/**
 * @swagger
 * components:
 *  schemas:
 *   SignupReqBody:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      example: atiiwo@vuvu.om
 *     password:
 *      type: string
 *      example: Abcd12345@#
 *   SuccessAuthentication:
 *    type: object
 *    properties:
 *     access_token:
 *      type: string
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     refresh_token:
 *      type: string
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *   GetMeResponse:
 *    type: object
 *    properties:
 *     _id:
 *      type: string
 *      format: MongoDB ObjectId
 *      example: 654ed7dafb4f9c263db2bcc1
 *     name:
 *      type: string
 *      example: atiiwo
 *     email:
 *      type: string
 *      example: atiiwo@vuvu.om
 *     date_of_birth:
 *      type: string
 *      format: ISO8601 date
 *      example: 2002-07-02T07:11:13.294Z
 *     created_at:
 *      type: string
 *      format: ISO8601 date
 *      example: 2023-11-11T01:24:42.780Z
 *     updated_at:
 *      type: string
 *      format: ISO8601 date
 *      example: 2023-11-11T01:24:42.780Z
 *     verify:
 *      $ref: '#/components/schemas/UserVerifyStatus'
 *     tweeter_circle:
 *      type: array
 *      example: [654e5ab05edd311cb0bc3e38, 654d9194207c954a3c78a2dd]
 *      items:
 *       type: string
 *       format: MongoDB ObjectId
 *       example: 654e5ab05edd311cb0bc3e38
 *     bio:
 *      type: string
 *      example: I'm a superman
 *     location:
 *      type: string
 *      example: Sai Gon, Viet Nam
 *     website:
 *      type: string
 *      example: https://atiiwo.example
 *     username:
 *      type: string
 *      example: user654ed7dafb4f9c263db2bcc1
 *     avatar:
 *      type: string
 *      example: https://atiiwo.example/avatar.png
 *     cover_photo:
 *      type: string
 *      example: https://atiiwo.example/cover_photo.png
 *   UserVerifyStatus:
 *    type: number
 *    enum: [Unverified, Verified, Banned]
 *    example: 1
 */

import mongoose from 'mongoose'
import isEmail from 'validator/lib/isemail'
import isStrongPassword from 'validator/lib/isStrongPassword'
import isLength from 'validator/lib/isLength'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required'],
      unique: [true, 'Username already exists'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Username is required'],
      unique: [true, 'Username already exists'],
      validate: [isEmail, 'Email is invalid'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      validate: [
        {
          validator: (password) => isLength(password, { min: 6, max: 86 }),
          message: 'Password must be between 6 and 86 characters',
        },
        {
          validator: (password) =>
            isStrongPassword(password, { minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
          message: 'Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
        },
      ],
    },
    confirm_password: {
      type: String,
      required: [true, 'Confirm password is required'],
      validate: [
        {
          validator: (confirm_password) => isLength(confirm_password, { min: 6, max: 86 }),
          message: 'Confirm password must be between 6 and 86 characters',
        },
        {
          validator: (confirm_password) =>
            isStrongPassword(confirm_password, { minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
          message: 'Confirm password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
        },
        {
          validator: function (confirm_password) {
            return confirm_password === this.password
          },
          message: 'Confirm password does not match with password',
        },
      ],
    },
  },
  { timestamps: true }
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  this.password = bcryptjs.hashSync(this.password, 10)
  this.confirm_password = undefined
  next()
})

const User = mongoose.model('user', userSchema)
export default User
