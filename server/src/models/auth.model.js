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
 *     access_token:
 *      type: string
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     refresh_token:
 *      type: string
 *      example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
