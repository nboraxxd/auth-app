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

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
