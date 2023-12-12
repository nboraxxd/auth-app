import { checkSchema } from 'express-validator'
import bcryptjs from 'bcryptjs'

import {
  CONFIRM_PASSWORD_MESSAGES,
  EMAIL_MESSAGES,
  NAME_MESSAGES,
  PASSWORD_MESSAGES,
  PHOTO_URL_MESSAGES,
  SIGNIN_MESSAGES,
  USERNAME_MESSAGES,
} from '@/constants/message'
import HTTP_STATUS from '@/constants/httpStatus'
import { validate } from '@/utils/validation'
import User from '@/models/auth.model'
import { ErrorWithStatus } from '@/models/Errors'

export const signupValidator = validate(
  checkSchema(
    {
      username: {
        notEmpty: { errorMessage: USERNAME_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: USERNAME_MESSAGES.MUST_BE_A_STRING },
        trim: true,
        isLength: { options: { min: 3, max: 128 }, errorMessage: USERNAME_MESSAGES.LENGTH },
        custom: {
          options: (username) => {
            // do not contain space
            if (username.includes(' ')) throw new Error(USERNAME_MESSAGES.MUST_NOT_CONTAIN_SPACE)
            // do not contain special characters
            if (!username.match(/^[a-zA-Z0-9_]+$/))
              throw new Error(USERNAME_MESSAGES.MUST_NOT_CONTAIN_SPECIAL_CHARACTERS)

            return true
          },
        },
      },
      email: {
        notEmpty: { errorMessage: EMAIL_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: EMAIL_MESSAGES.MUST_BE_A_STRING },
        trim: true,
        isEmail: { errorMessage: EMAIL_MESSAGES.INVALID },
      },
      password: {
        notEmpty: { errorMessage: PASSWORD_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: PASSWORD_MESSAGES.MUST_BE_A_STRING },
        isLength: { options: { min: 6, max: 86 }, errorMessage: PASSWORD_MESSAGES.LENGTH },
        isStrongPassword: {
          options: {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          errorMessage: PASSWORD_MESSAGES.IS_STRONG,
        },
      },
      confirm_password: {
        notEmpty: { errorMessage: CONFIRM_PASSWORD_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: CONFIRM_PASSWORD_MESSAGES.MUST_BE_A_STRING },
        isLength: { options: { min: 6, max: 86 }, errorMessage: CONFIRM_PASSWORD_MESSAGES.LENGTH },
        isStrongPassword: {
          options: {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          errorMessage: CONFIRM_PASSWORD_MESSAGES.IS_STRONG,
        },
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error(CONFIRM_PASSWORD_MESSAGES.DOES_NOT_MATCH)
            }
            return true
          },
        },
      },
    },
    ['body']
  )
)

export const signinValidator = validate(
  checkSchema(
    {
      email: {
        notEmpty: { errorMessage: EMAIL_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: EMAIL_MESSAGES.MUST_BE_A_STRING },
        trim: true,
        isEmail: { errorMessage: EMAIL_MESSAGES.INVALID },
        custom: {
          options: async (value, { req }) => {
            const user = await User.findOne({ email: value })
            if (user === null)
              throw new ErrorWithStatus({ message: EMAIL_MESSAGES.NOT_FOUND, statusCode: HTTP_STATUS.NOT_FOUND })

            const isMatchPassword = bcryptjs.compareSync(req.body.password, user.password)
            if (!isMatchPassword) throw new Error(SIGNIN_MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)

            req.user = user
            return true
          },
        },
      },
      password: {
        notEmpty: { errorMessage: PASSWORD_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: PASSWORD_MESSAGES.MUST_BE_A_STRING },
        isLength: { options: { min: 6, max: 86 }, errorMessage: PASSWORD_MESSAGES.LENGTH },
        isStrongPassword: {
          options: {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
          errorMessage: PASSWORD_MESSAGES.IS_STRONG,
        },
      },
    },
    ['body']
  )
)

export const googleOAuthValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: { errorMessage: NAME_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: NAME_MESSAGES.MUST_BE_A_STRING },
      },
      email: {
        notEmpty: { errorMessage: EMAIL_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: EMAIL_MESSAGES.MUST_BE_A_STRING },
        trim: true,
        isEmail: { errorMessage: EMAIL_MESSAGES.INVALID },
      },
      photo_url: {
        notEmpty: { errorMessage: PHOTO_URL_MESSAGES.IS_REQUIRED },
        isURL: { errorMessage: PHOTO_URL_MESSAGES.INVALID },
      },
    },
    ['body']
  )
)
