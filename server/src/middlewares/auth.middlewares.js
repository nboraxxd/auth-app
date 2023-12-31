import { ObjectId } from 'mongodb'
import { checkSchema } from 'express-validator'
import bcryptjs from 'bcryptjs'
import omit from 'lodash/omit'

import {
  CONFIRM_PASSWORD_MESSAGES,
  EMAIL_MESSAGES,
  NAME_MESSAGES,
  PASSWORD_MESSAGES,
  PHOTO_URL_MESSAGES,
  REFRESH_TOKEN_MESSAGES,
  SIGNIN_MESSAGES,
  USERNAME_MESSAGES,
  USER_MESSAGES,
} from '@/constants/message'
import HTTP_STATUS from '@/constants/httpStatus'
import { validate } from '@/utils/validation'
import { verifyAccessToken, verifyToken } from '@/utils/jwt'
import User from '@/models/auth.model'
import { ErrorWithStatus, RequiredFieldError } from '@/models/Errors'
import { envConfig } from '@/constants/config'
import RefreshToken from '@/models/refreshToken.model'
import { JsonWebTokenError } from 'jsonwebtoken'
import capitalize from 'lodash/capitalize'

const usernameSchema = {
  notEmpty: { errorMessage: USERNAME_MESSAGES.IS_REQUIRED },
  isString: { errorMessage: USERNAME_MESSAGES.MUST_BE_A_STRING },
  trim: true,
  isLength: { options: { min: 3, max: 128 }, errorMessage: USERNAME_MESSAGES.LENGTH },
  custom: {
    options: (username) => {
      // must not contain space
      if (username.includes(' ')) throw new Error(USERNAME_MESSAGES.MUST_NOT_CONTAIN_SPACE)
      // must not contain special characters
      if (!username.match(/^[a-zA-Z0-9_]+$/)) throw new Error(USERNAME_MESSAGES.MUST_NOT_CONTAIN_SPECIAL_CHARACTERS)

      return true
    },
  },
}

const emailSchema = {
  notEmpty: { errorMessage: EMAIL_MESSAGES.IS_REQUIRED },
  isString: { errorMessage: EMAIL_MESSAGES.MUST_BE_A_STRING },
  trim: true,
  isEmail: { errorMessage: EMAIL_MESSAGES.INVALID },
}

const passwordSchema = {
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
}

const confirmPasswordSchema = {
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
}

export const accessTokenValidator = validate(
  checkSchema(
    {
      access_token: {
        custom: {
          options: async (value, { req }) => {
            return await verifyAccessToken(value, req)
          },
        },
      },
    },
    ['cookies']
  )
)

export const signupValidator = validate(
  checkSchema(
    {
      username: usernameSchema,
      email: emailSchema,
      password: passwordSchema,
      confirm_password: confirmPasswordSchema,
    },
    ['body']
  )
)

export const signinValidator = validate(
  checkSchema(
    {
      email: {
        ...emailSchema,
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
      password: passwordSchema,
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
      email: emailSchema,
      photo_url: {
        notEmpty: { errorMessage: PHOTO_URL_MESSAGES.IS_REQUIRED },
        isURL: { errorMessage: PHOTO_URL_MESSAGES.INVALID },
      },
    },
    ['body']
  )
)

export const updateMeValidator = validate(
  checkSchema({
    username: {
      ...usernameSchema,
      optional: true,
    },

    password: {
      ...passwordSchema,
      optional: true,
      custom: {
        options: (value, { req }) => {
          if (value && !req.body.confirm_password) {
            throw new RequiredFieldError({
              message: CONFIRM_PASSWORD_MESSAGES.IS_REQUIRED,
              fieldRequired: 'confirm_password',
            })
          }
          return true
        },
      },
    },

    confirm_password: {
      ...omit(confirmPasswordSchema, ['custom']),
      optional: true,
      custom: {
        options: (value, { req }) => {
          if (value && !req.body.password) {
            throw new RequiredFieldError({ message: PASSWORD_MESSAGES.IS_REQUIRED, fieldRequired: 'password' })
          }
          if (value !== req.body.password) {
            throw new Error(CONFIRM_PASSWORD_MESSAGES.DOES_NOT_MATCH)
          }
          return true
        },
      },
    },

    photo_url: {
      notEmpty: { errorMessage: PHOTO_URL_MESSAGES.IS_REQUIRED },
      isURL: { errorMessage: PHOTO_URL_MESSAGES.INVALID },
      optional: true,
    },
  })
)

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: REFRESH_TOKEN_MESSAGES.IS_REQUIRED,
                statusCode: HTTP_STATUS.UNAUTHORIZED,
              })
            }

            try {
              const [decoded_refresh_token, refresh_token] = await Promise.all([
                verifyToken({ token: value, secretOrPublicKey: envConfig.jwtSecretRefreshToken }),
                RefreshToken.findOne({ token: value }),
              ])

              if (refresh_token === null) {
                throw new ErrorWithStatus({
                  message: REFRESH_TOKEN_MESSAGES.NOT_FOUND,
                  statusCode: HTTP_STATUS.UNAUTHORIZED,
                })
              }

              const user = await User.findById(new ObjectId(decoded_refresh_token.user_id))
              if (user === null) {
                throw new ErrorWithStatus({
                  message: USER_MESSAGES.NOT_FOUND,
                  statusCode: HTTP_STATUS.UNAUTHORIZED,
                })
              }

              req.decoded_refresh_token = decoded_refresh_token
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  statusCode: HTTP_STATUS.UNAUTHORIZED,
                })
              }
              throw error
            }

            return true
          },
        },
      },
    },
    ['cookies']
  )
)
