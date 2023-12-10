import { checkSchema } from 'express-validator'

import { CONFIRM_PASSWORD_MESSAGES, EMAIL_MESSAGES, PASSWORD_MESSAGES, USERNAME_MESSAGES } from '@/constants/message'
import { validate } from '@/utils/validation'

export const signupValidator = validate(
  checkSchema(
    {
      username: {
        notEmpty: { errorMessage: USERNAME_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: USERNAME_MESSAGES.MUST_BE_A_STRING },
        trim: true,
        isLength: { options: { min: 3, max: 20 }, errorMessage: USERNAME_MESSAGES.LENGTH },
      },
      email: {
        notEmpty: { errorMessage: EMAIL_MESSAGES.IS_REQUIRED },
        isString: { errorMessage: EMAIL_MESSAGES.MUST_BE_A_STRING },
        trim: true,
        isEmail: { errorMessage: EMAIL_MESSAGES.INVALID_EMAIL },
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
  checkSchema({
    email: {
      notEmpty: { errorMessage: EMAIL_MESSAGES.IS_REQUIRED },
      isString: { errorMessage: EMAIL_MESSAGES.MUST_BE_A_STRING },
      trim: true,
      isEmail: { errorMessage: EMAIL_MESSAGES.INVALID_EMAIL },
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
  })
)
